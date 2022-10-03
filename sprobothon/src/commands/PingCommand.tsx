import { SlashCommandBuilder } from "discord.js";

import type { ChatCommand } from "./CommandTypes";

const PingCommand: ChatCommand = {
  name: "ping",
  get data() {
    return new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!");
  },
  async action(interaction) {
    await interaction.reply({ content: "Pong", ephemeral: true });
  },
};

export default PingCommand;
