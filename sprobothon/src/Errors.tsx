import { UserGroup } from "./ConfigTypes";

export class CommandError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export default {
  PREDICATE_NOT_MET: "Conditions for running this command were not met",
  NOT_IN_GROUP: (group: UserGroup) =>
    `You are not in the required group for this command (${group})`,
  EXECUTION_ERROR: "There was an error while executing this command",
  RENDER_SERVICE_FETCH_FAILED: "Unable to fetch services from Render.com",
  UNKOWN_SERVICE: (service: string) => `"${service}" is not a recognized service name`,
  NO_SERVICE_SPECIFIED: "No service specified",
  RENDER_UNABLE_TO_DEPLOY: (service: string) => `Couldn't create a new deploy for "${service}".`,
  GITHUB_FAILED_TO_DISPATCH_WORKFLOW: (workflowId: string) =>
    `Failed to dispatch workflow ${workflowId}`,
  GITHUB_FAILED_TO_FETCH_WORKFLOW_RUNS: (workflowId: string) =>
    `Failed to fetch latest runs for workflow ${workflowId}`,
};
