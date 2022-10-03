import { REST, Routes } from "discord.js";

import { getConfig } from "./Config";
import Logger from "./Logger";

const config = getConfig();

const rest = new REST({ version: "10" }).setToken(config.botToken);

rest
  .put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: config.commands.map((command) => command.data.toJSON()),
  })
  .then((data: any) => Logger.info(`Successfully registered ${data.length} application commands.`))
  .catch(Logger.error);
