import { SlashCommandBuilder } from "discord.js";

import Errors, { CommandError } from "../Errors";
import RenderClient from "../integrations/render/RenderClient";
import { userIsInGroup } from "../Predicates";
import type { ChatCommand } from "./CommandTypes";

const DeployCommand: ChatCommand = {
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
    const services = await RenderClient.getServices();

    const choices = services.map((service) => service.service.name);
    const filtered = choices.filter((choice) => choice.includes(focusedValue));
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

    interaction.deferReply({ ephemeral: true });
    const services = await RenderClient.getServices();
    const service = services
      .map((service) => service.service)
      .find((service) => service.name === serviceName);
    if (service == null) {
      await interaction.editReply({
        content: Errors.UNKOWN_SERVICE(serviceName),
      });
      return;
    }

    const deploy = await RenderClient.createDeploy({}, { serviceId: service.id }).catch(() => {
      throw new CommandError(Errors.RENDER_UNABLE_TO_DEPLOY(serviceName));
    });

    await interaction.editReply({
      content: `Started deploy of ${service.name}. Track its status here: <https://dashboard.render.com/static/${service.id}/deploys/${deploy.id}>`,
    });
  },
};

export default DeployCommand;
