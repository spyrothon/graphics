import { Client } from "discord.js";

import { commands } from "./Commands";
import config from "./Config";
import Errors from "./Errors";
import Logger from "./Logger";

// Create a new client instance
const client = new Client({ intents: [] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  Logger.info(
    `[${interaction.id}] ${interaction.user.tag} in #${interaction.channelId} triggered interaction ${commandName}.`,
  );
  const command = commands.get(commandName);
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
});

// Login to Discord with your client's token
client.login(config.botToken);
