import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import Errors, { CommandError } from "../Errors";
import RenderClient from "../integrations/render/RenderClient";
import { userIsInGroup } from "../Predicates";
import { humanizedDateTime } from "../util/DateTimeUtil";
import type { ChatCommand } from "./CommandTypes";

const VersionsCommand: ChatCommand = {
  predicate: (interaction) => userIsInGroup(interaction.user, "deployers"),
  get data() {
    return new SlashCommandBuilder()
      .setName("versions")
      .setDescription("Get the current deployed versions for all services")
      .setDefaultMemberPermissions(0);
  },
  async action(interaction) {
    interaction.deferReply({ ephemeral: true });
    const services = await RenderClient.getServices().catch(() => {
      throw new CommandError(Errors.RENDER_SERVICE_FETCH_FAILED);
    });

    let allSucceeded = true;

    const embed = new EmbedBuilder()
      .setTitle("Deployed versions")
      .setDescription(`${services.length} known services are currently deployed.`);

    for (const serviceObject of services) {
      const service = serviceObject.service;
      if (service == null) continue;

      if (service.suspended === "suspended") {
        embed.addFields({ name: service.name, value: "Service is suspended" });
        continue;
      }

      let deployFetchFailed = false;
      const deploys = await RenderClient.getDeploys({
        serviceId: service.id,
      }).catch(() => {
        deployFetchFailed = true;
        return [];
      });

      if (deployFetchFailed) {
        embed.addFields({ name: service.name, value: "!! Could not fetch deployments" });
        allSucceeded = false;
        continue;
      }

      const latest = deploys.find((deploy) => deploy.deploy.status === "live");

      if (latest == null) {
        embed.addFields({ name: service.name, value: "No active deployment" });
        continue;
      }

      const commit = latest.deploy.commit;
      const shortId = commit.id.substring(0, 8);
      const message = commit.message.split("\n")[0];
      const deployedAt = humanizedDateTime(service.updatedAt);

      embed.addFields({
        name: `${service.name}`,
        value: `_Deployed at: ${deployedAt}_\n[${shortId} - ${message}](${service.repo}/commit/${commit.id})`,
      });
    }

    embed.setTimestamp().setColor(allSucceeded ? "Green" : "Red");

    await interaction.editReply({
      embeds: [embed],
    });
  },
};

export default VersionsCommand;
