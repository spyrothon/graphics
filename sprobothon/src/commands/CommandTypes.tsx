import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export interface ChatCommand {
  predicate?: (interaction: ChatInputCommandInteraction) => boolean | { error: string };
  data: SlashCommandBuilder;
  action(interaction: ChatInputCommandInteraction): Promise<void>;
}
