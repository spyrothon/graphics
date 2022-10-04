import { AutocompleteInteraction, ChatInputCommandInteraction, Client } from "discord.js";

import { getConfig, loadConfig } from "./Config";
import Errors from "./Errors";
import Logger from "./Logger";

// This ends up being relative to the _current working directory_, not this file...
const CONFIG_PATH =
  process.env.SPROBOTHON_CONFIG_PATH ?? `./config/env.${process.env.NODE_ENV ?? "dev"}.tsx`;
await loadConfig(CONFIG_PATH);

// Create a new client instance
const client = new Client({ intents: [] });

// When the client is ready, run this code (only once)
client.once("ready", async () => {
  Logger.info("Ready!");
  // Preload data to be available for interactions
  const guild = await client.guilds.fetch(getConfig().guildId);
  await guild.channels.fetch();
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
    const alreadyReplied = interaction.replied;
    Logger.error(`[${interaction.id}] failed to run ${commandName}`, { error, alreadyReplied });

    if (!alreadyReplied) {
      await interaction.reply({
        content: Errors.EXECUTION_ERROR,
        ephemeral: true,
      });
    }
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
  } catch (error) {
    Logger.error(`[${interaction.id}] failed to autocomplete ${commandName}`, error);
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
