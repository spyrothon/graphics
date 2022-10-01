import { UserGroup } from "./config/env";

export default {
  PREDICATE_NOT_MET: "Conditions for running this command were not met",
  NOT_IN_GROUP: (group: UserGroup) =>
    `You are not in the required group for this command (${group})`,
  EXECUTION_ERROR: "There was an error while executing this command",
};
