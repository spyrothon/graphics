import Errors from "../Errors";
import { GithubAPI } from "../integrations/github/GithubAppClient";
import {
  DeployResponse,
  ServiceAdapter,
  StatusResponse,
  VersionResponse,
} from "../services/ServiceAdapter";

const GITHUB_ACTION_DEPLOY_CREATED_POLL_INTERVAL = 1200;
const GITHUB_ACTION_DEPLOY_POLL_INTERVAL = 5000;
const GITHUB_ACTION_MAX_CREATE_POLL_ATTEMPTS = 20;
const GITHUB_ACTION_DEPLOY_FINISHED_STATUSES = ["success", "action_required"];
const GITHUB_ACTION_DEPLOY_FAILED_STATUSES = [
  "neutral",
  "skipped",
  "cancelled",
  "timed_out",
  "failure",
];

async function waitForPollInterval(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

export default class GithubActionAdapter extends ServiceAdapter {
  constructor(
    public serviceName: string,
    public account: string,
    public repo: string,
    public branch: string,
    public workflowId: string,
  ) {
    super();
  }

  async version(): Promise<VersionResponse> {
    const response = await GithubAPI.rest.actions.listWorkflowRuns({
      owner: this.account,
      repo: this.repo,
      workflow_id: this.workflowId,
    });
    const latest = response.data.workflow_runs.find((run) => run.conclusion === "success");
    return {
      name: latest.head_commit.message,
      commit: latest.head_commit.id,
      deployedAt: new Date(latest.updated_at),
    };
  }

  async deploy(): Promise<DeployResponse> {
    const params = {
      owner: this.account,
      repo: this.repo,
      workflow_id: this.workflowId,
    };
    const triggerId = new Date().toString();
    try {
      await GithubAPI.rest.actions.createWorkflowDispatch({
        ...params,
        ref: this.branch,
        inputs: {
          trigger_id: triggerId,
        },
      });
    } catch {
      return {
        status: "error",
        reason: Errors.GITHUB_FAILED_TO_DISPATCH_WORKFLOW(this.workflowId),
      };
    }

    try {
      let latest = undefined;
      let findAttempts = 0;
      while (latest == null) {
        await waitForPollInterval(GITHUB_ACTION_DEPLOY_CREATED_POLL_INTERVAL);
        const runs = await GithubAPI.rest.actions.listWorkflowRuns({ ...params });
        latest = runs.data.workflow_runs.find((run) => run.name === triggerId);
        findAttempts += 1;
        if (findAttempts >= GITHUB_ACTION_MAX_CREATE_POLL_ATTEMPTS) {
          return {
            status: "error",
            reason: Errors.GITHUB_WORKFLOW_RUN_FETCH_TIMED_OUT(this.workflowId, triggerId),
          };
        }
      }
      return {
        status: "success",
        commit: {
          id: latest.head_commit.id,
          message: latest.head_commit.message,
          createdAt: latest.head_commit.timestamp,
        },
        deployId: `${latest.id}`,
        statusUrl: `${latest.repository.html_url}/actions/runs/${latest.id}`,
        createdAt: new Date(latest.created_at),
      };
    } catch {
      return {
        status: "error",
        reason: Errors.GITHUB_FAILED_TO_FETCH_WORKFLOW_RUNS(this.workflowId),
      };
    }
  }

  async deployStatus(deployId: string): Promise<StatusResponse> {
    const result = await GithubAPI.rest.actions.getWorkflowRun({
      owner: this.account,
      repo: this.repo,
      run_id: parseInt(deployId),
    });
    return {
      status: result.data.conclusion,
      createdAt: new Date(result.data.run_started_at),
      updatedAt: new Date(result.data.updated_at),
    };
  }

  async whenDeployFinished(deployId: string): Promise<StatusResponse> {
    await waitForPollInterval(GITHUB_ACTION_DEPLOY_POLL_INTERVAL);
    const status = await this.deployStatus(deployId);
    if (GITHUB_ACTION_DEPLOY_FINISHED_STATUSES.includes(status.status)) {
      return status;
    } else if (GITHUB_ACTION_DEPLOY_FAILED_STATUSES.includes(status.status)) {
      return Promise.reject(status);
    } else {
      return await this.whenDeployFinished(deployId);
    }
  }
}
