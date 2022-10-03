import type { ServiceAdapter } from "./adapters/ServiceAdapter";
import { ChatCommand } from "./commands/CommandTypes";

export type UserId = string | {};

export interface UserGroups {
  deployers: Set<UserId>;
}

export type UserGroup = keyof UserGroups;

export interface Config {
  botToken: string;
  clientId: string;
  guildId: string;
  userGroups: UserGroups;
  services: Record<string, ServiceAdapter>;
  commands: ChatCommand[];
}
