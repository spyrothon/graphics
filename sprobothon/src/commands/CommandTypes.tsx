import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export interface ChatCommand {
  get name(): string;
  predicate?: (interaction: ChatInputCommandInteraction) => boolean | { error: string };
  get data(): SlashCommandBuilder;
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
  action: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
