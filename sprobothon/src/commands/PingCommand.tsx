import { SlashCommandBuilder } from "discord.js";

import RenderClient, { GetServices_Response_200 } from "../integrations/render/RenderClient";
import { userIsInGroup } from "../Predicates";
import type { ChatCommand } from "./CommandTypes";

const PingCommand: ChatCommand = {
  predicate: (interaction) => userIsInGroup(interaction.user, "deployers"),
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async action(interaction) {
    const services = (await RenderClient.getServices()) as GetServices_Response_200;
    const serviceNames = services.map((service) => service.service?.name);
    await interaction.reply({
      content: JSON.stringify(serviceNames),
      ephemeral: true,
    });
  },
};

export default PingCommand;
