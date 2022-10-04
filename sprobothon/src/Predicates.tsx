import { User } from "discord.js";

import { getConfig } from "./Config";
import { UserGroup } from "./ConfigTypes";
import Errors from "./Errors";

export function userIsInGroup(user: User, group: UserGroup) {
  const passes = getConfig().userGroups[group].has(user.id);
  return passes ? true : { error: Errors.NOT_IN_GROUP(group) };
}
