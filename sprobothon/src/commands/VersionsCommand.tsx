import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { getConfig } from "../Config";
import { userIsInGroup } from "../Predicates";
import { humanizedDateTime } from "../util/DateTimeUtil";
import type { ChatCommand } from "./CommandTypes";

const VersionsCommand: ChatCommand = {
  name: "versions",
  predicate: (interaction) => userIsInGroup(interaction.user, "deployers"),
  get data() {
    return new SlashCommandBuilder()
      .setName("versions")
      .setDescription("Get the current deployed versions for all services")
      .setDefaultMemberPermissions(0);
  },
  async action(interaction) {
    interaction.deferReply({ ephemeral: true });
    const services = getConfig().services;
    const embed = new EmbedBuilder()
      .setTitle("Deployed versions")
      .setDescription(`${services.length} known services are currently deployed.`);

    let allSucceeded = true;
    for (const serviceName of Object.keys(services)) {
      const service = services[serviceName];
      if (service == null) continue;

      const version = await service.version();
      if (version == null) {
        embed.addFields({ name: serviceName, value: "No active deployment" });
        continue;
      }

      const shortId = version.commit?.substring(0, 8);
      const message = version.name.split("\n")[0];
      const deployedAt =
        version.deployedAt != null ? humanizedDateTime(version.deployedAt) : undefined;

      embed.addFields({
        name: `${serviceName}`,
        value: `_Deployed at: ${deployedAt}_\n${message} (${shortId})`,
      });
    }

    embed.setTimestamp().setColor(allSucceeded ? "Green" : "Red");

    await interaction.editReply({
      embeds: [embed],
    });
  },
};

export default VersionsCommand;
