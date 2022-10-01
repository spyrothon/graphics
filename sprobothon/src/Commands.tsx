import { Collection } from "discord.js";
import fs from "fs";
import path from "path";

import { ChatCommand } from "./commands/CommandTypes";

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith("Command.tsx"));

export const commands = new Collection<string, ChatCommand>();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const { default: command } = await import(filePath);
  commands.set(command.data.name, command);
}
