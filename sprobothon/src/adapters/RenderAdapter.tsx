import { ServiceType } from "render-api";

import Errors from "../Errors";
import RenderClient from "../integrations/render/RenderClient";
import { ServiceAdapter, StatusResponse } from "./ServiceAdapter";

function getServiceUrl(id: string, type: ServiceType) {
  const base = "https://dashboard.render.com/";
  switch (type) {
    case "static_site":
      return `${base}/static/${id}`;
    // TODO: expand this later
    default:
      return base;
  }
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

  async deploy() {
    try {
      const response = await RenderClient.createDeploy({}, { serviceId: this.serviceId });

      return {
        status: "success" as const,
        statusUrl: `${getServiceUrl(this.serviceId, this.serviceType)}/deploys/${response.id}`,
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
      startedAt: new Date(response.createdAt),
      updatedAt: new Date(response.updatedAt),
    };
  }
}
