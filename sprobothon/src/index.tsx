import { AutocompleteInteraction, ChatInputCommandInteraction, Client } from "discord.js";

import { getConfig, loadConfig } from "./Config";
import Errors from "./Errors";
import Logger from "./Logger";

await loadConfig();

// Create a new client instance
const client = new Client({ intents: [] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  Logger.info("Ready!");
});

async function handleChatCommand(interaction: ChatInputCommandInteraction) {
  const { commandName } = interaction;
  Logger.info(
    `[${interaction.id}] ${interaction.user.tag} in #${interaction.channelId} triggered interaction ${commandName}.`,
  );
  const command = getConfig().commands.find((command) => command.name === commandName);
  if (command == null) {
    Logger.info(`[${interaction.id}] ${commandName} is not a registered command`);
    return;
  }

  const predicateResult = command.predicate?.(interaction) ?? true;
  if (predicateResult !== true) {
    const error =
      typeof predicateResult === "object" ? predicateResult.error : Errors.PREDICATE_NOT_MET;
    Logger.warn(
      `[${interaction.id}] ${interaction.user.tag} did not meet the predicate for ${commandName}`,
      error,
    );
    await interaction.reply({
      content: error,
      ephemeral: true,
    });
    return;
  }

  try {
    await command.action(interaction);
    Logger.info(`[${interaction.id}] successfully ran ${commandName}`);
    if (!interaction.replied) {
      await interaction.reply({ content: `Successfully ran ${commandName}`, ephemeral: true });
    }
  } catch (error) {
    Logger.error(`[${interaction.id}] failed to run ${commandName}`, error);
    await interaction.reply({
      content: Errors.EXECUTION_ERROR,
      ephemeral: true,
    });
  }
}

async function handleAutocomplete(interaction: AutocompleteInteraction) {
  const { commandName } = interaction;
  Logger.info(
    `[${interaction.id}] ${interaction.user.tag} in #${interaction.channelId} requested autocomplete for ${commandName}.`,
  );
  const command = getConfig().commands.find((command) => command.name === commandName);
  if (command == null) {
    Logger.info(`[${interaction.id}] ${commandName} is not a registered command`);
    return;
  }

  if (command.autocomplete == null) {
    Logger.info(`[${interaction.id}] ${commandName} has no registered autocompleters`);
    return;
  }

  try {
    await command.autocomplete(interaction);
    Logger.info(`[${interaction.id}] successfully ran ${commandName}`);
  } catch (error) {
    Logger.error(`[${interaction.id}] failed to run ${commandName}`, error);
  }
}

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    handleChatCommand(interaction);
    return;
  }
  if (interaction.isAutocomplete()) {
    handleAutocomplete(interaction);
    return;
  }
});

// Login to Discord with your client's token
client.login(getConfig().botToken);
