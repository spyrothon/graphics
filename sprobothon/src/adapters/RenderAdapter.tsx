import { ServiceType } from "render-api";

import Errors from "../Errors";
import RenderClient from "../integrations/render/RenderClient";
import { DeployResponse, ServiceAdapter, StatusResponse } from "../services/ServiceAdapter";

const RENDER_DEPLOY_POLL_INTERVAL = 5000;
const RENDER_DEPLOY_FINISHED_STATUSES = ["live"];
const RENDER_DEPLOY_FAILED_STATUSES = ["deactivated", "build_failed", "update_failed", "canceled"];

function getServiceUrl(id: string, type: ServiceType) {
  const base = "https://dashboard.render.com";
  switch (type) {
    case "static_site":
      return `${base}/static/${id}`;
    // TODO: expand this later
    default:
      return base;
  }
}

async function waitForPollInterval(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

export default class RenderAdapter extends ServiceAdapter {
  constructor(
    public serviceName: string,
    public serviceType: ServiceType,
    public serviceId: string,
  ) {
    super();
  }

  async version() {
    const response = await RenderClient.getDeploys({ serviceId: this.serviceId });
    const latest = response.map((res) => res.deploy).find((deploy) => deploy.status === "live");
    if (latest == null) return undefined;

    return {
      name: latest.commit.message,
      commit: latest.commit.id,
      deployedAt: new Date(latest.finishedAt),
    };
  }

  async deploy(): Promise<DeployResponse> {
    try {
      const response = await RenderClient.createDeploy({}, { serviceId: this.serviceId });

      return {
        status: "success" as const,
        statusUrl: `${getServiceUrl(this.serviceId, this.serviceType)}/deploys/${response.id}`,
        commit: response.commit,
        deployId: response.id,
        createdAt: new Date(response.createdAt),
      };
    } catch (e) {
      return {
        status: "error" as const,
        reason: Errors.RENDER_UNABLE_TO_DEPLOY(this.serviceName),
      };
    }
  }

  async deployStatus(deployId: string): Promise<StatusResponse> {
    const response = await RenderClient.getDeploy({ serviceId: this.serviceId, deployId });
    return {
      status: response.status,
      createdAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  }

  async whenDeployFinished(deployId: string): Promise<StatusResponse> {
    await waitForPollInterval(RENDER_DEPLOY_POLL_INTERVAL);
    const status = await this.deployStatus(deployId);
    if (RENDER_DEPLOY_FINISHED_STATUSES.includes(status.status)) {
      return status;
    } else if (RENDER_DEPLOY_FAILED_STATUSES.includes(status.status)) {
      return Promise.reject(status);
    } else {
      return await this.whenDeployFinished(deployId);
    }
  }
}
