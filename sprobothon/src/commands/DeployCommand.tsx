import { SlashCommandBuilder } from "discord.js";

import { getConfig } from "../Config";
import Errors, { CommandError } from "../Errors";
import { userIsInGroup } from "../Predicates";
import type { ChatCommand } from "./CommandTypes";

const DeployCommand: ChatCommand = {
  name: "deploy",
  predicate: (interaction) => userIsInGroup(interaction.user, "deployers"),

  get data() {
    const builder = new SlashCommandBuilder()
      .setName("deploy")
      .setDescription("Start a deployment of any of the known services");

    builder.addStringOption((option) =>
      option.setName("service").setDescription("The service to be deployed").setAutocomplete(true),
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

    interaction.deferReply({ ephemeral: true });

    const deploy = await service.deploy().catch(() => {
      throw new CommandError(Errors.RENDER_UNABLE_TO_DEPLOY(serviceName));
    });

    switch (deploy.status) {
      case "success":
        await interaction.editReply({
          content: `Started deploy of ${serviceName}. Track its status here: <${deploy.statusUrl}>`,
        });
        return;
      case "error":
        await interaction.editReply({
          content: `Deploy failed: ${deploy.reason}`,
        });
    }
  },
};

export default DeployCommand;
