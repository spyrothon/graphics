import { User } from "discord.js";

import { UserGroup } from "./config/env";
import Config from "./Config";
import Errors from "./Errors";

export function userIsInGroup(user: User, group: UserGroup) {
  const passes = Config.userGroups[group].has(user.id);
  return passes ? true : { error: Errors.NOT_IN_GROUP(group) };
}
