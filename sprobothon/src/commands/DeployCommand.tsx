import { EmbedBuilder, SlashCommandBuilder, userMention } from "discord.js";

import { getConfig } from "../Config";
import Errors, { CommandError } from "../Errors";
import { userIsInGroup } from "../Predicates";
import { DeploySuccessResponse, StatusResponse } from "../services/ServiceAdapter";
import { humanizedDateTime } from "../util/DateTimeUtil";
import type { ChatCommand } from "./CommandTypes";

enum Thumbnails {
  IN_PROGRESS = "https://64.media.tumblr.com/fee6af1a4d1dc229ad635fc339b0905b/tumblr_n4525gOXXm1tq47ppo1_250.gif",
  SUCCESS = "https://www.iconsdb.com/icons/preview/green/checkmark-xxl.png",
  FAILURE = "https://www.iconsdb.com/icons/preview/red/x-mark-xxl.png",
}

function createDeployEmbed(serviceName: string, deploy: DeploySuccessResponse): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle(`Deploy started`)
    .setThumbnail(Thumbnails.IN_PROGRESS)
    .addFields(
      {
        name: "Service",
        value: serviceName,
        inline: true,
      },
      {
        name: "Status",
        value: "in progress",
        inline: true,
      },
      {
        name: "Commit",
        value: `(${deploy.commit.id.substring(0, 6)}) ${deploy.commit.message.split("\n")[0]}`,
      },
      {
        name: "Tracking URL",
        value: deploy.statusUrl,
      },
    )
    .setFooter({ text: `Started at ${humanizedDateTime(deploy.createdAt)}` });
}

function setEmbedStatus(
  embed: EmbedBuilder,
  succeeded: boolean,
  status: StatusResponse,
): EmbedBuilder {
  if (succeeded) {
    return embed
      .setThumbnail(Thumbnails.SUCCESS)
      .setColor("Green")
      .setTitle("Deploy succeeded")
      .spliceFields(1, 1, { name: "Status", value: status.status, inline: true });
  } else {
    return embed
      .setThumbnail(Thumbnails.FAILURE)
      .setColor("Red")
      .setTitle("Deploy failed")
      .spliceFields(1, 1, { name: "Status", value: status.status, inline: true });
  }
}

const DeployCommand: ChatCommand = {
  name: "deploy",
  predicate: (interaction) => userIsInGroup(interaction.user, "deployers"),

  get data() {
    const builder = new SlashCommandBuilder()
      .setName("deploy")
      .setDescription("Start a deployment of any of the known services");

    builder.addStringOption((option) =>
      option
        .setName("service")
        .setDescription("The service to be deployed")
        .setAutocomplete(true)
        .setRequired(true),
    );

    return builder;
  },

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const serviceNames = Object.keys(getConfig().services);

    const filtered = serviceNames.filter((name) => name.includes(focusedValue));
    await interaction.respond(filtered.map((choice) => ({ name: choice, value: choice })));
  },

  async action(interaction) {
    const serviceName = interaction.options.getString("service");
    if (serviceName == null) {
      await interaction.reply({
        content: Errors.NO_SERVICE_SPECIFIED,
        ephemeral: true,
      });
      return;
    }

    const service = getConfig().services[serviceName];
    if (service == null) {
      await interaction.reply({
        content: Errors.UNKOWN_SERVICE(serviceName),
        ephemeral: true,
      });
      return;
    }

    interaction.reply(
      `Okay, ${userMention(interaction.user.id)}, starting a deploy for ${serviceName}`,
    );

    const deploy = await service.deploy().catch(() => {
      throw new CommandError(Errors.RENDER_UNABLE_TO_DEPLOY(serviceName));
    });

    switch (deploy.status) {
      case "success": {
        const replyMessage = await interaction.fetchReply();
        const thread = await replyMessage.startThread({
          name: `${
            interaction.user.username
          } started a deploy of "${serviceName}" (${new Date().toString()})`,
          reason: `Threading status update messages for this deploy of ${serviceName}`,
        });
        const embed = createDeployEmbed(serviceName, deploy);
        const statusEmbed = await thread.send({
          embeds: [embed],
        });

        service
          .whenDeployFinished?.(deploy.deployId)
          .then((status) => {
            const updatedEmbed = setEmbedStatus(embed, true, status);
            statusEmbed.edit({ embeds: [updatedEmbed] });
            return thread.send({
              content: `${userMention(
                interaction.user.id,
              )} your deploy of ${serviceName} has finished`,
            });
          })
          .catch((status: StatusResponse) => {
            const updatedEmbed = setEmbedStatus(embed, false, status);
            statusEmbed.edit({ embeds: [updatedEmbed] });
            return thread.send({
              content: `!! ${userMention(
                interaction.user.id,
              )} your deploy of ${serviceName} has failed`,
            });
          });
        return;
      }
      case "error":
        await interaction.editReply({
          content: `Failed to create deploy: ${deploy.reason}`,
        });
    }
  },
};

export default DeployCommand;
