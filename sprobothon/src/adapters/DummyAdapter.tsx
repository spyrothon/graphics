import { DeployResponse, ServiceAdapter, StatusResponse } from "../services/ServiceAdapter";

const DUMMY_DEPLOY_WAIT_TIME = 5000;

async function waitForPollInterval(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}

export default class DummyAdapter extends ServiceAdapter {
  async version() {
    return {
      name: "a version",
      commit: "123afsf4214lkjljk",
      deployedAt: new Date(),
    };
  }

  async deploy(): Promise<DeployResponse> {
    return {
      status: "success" as const,
      statusUrl: "https://example.com",
      commit: {
        id: "987adsf087123j",
        message: "Hello this is a dummy commit",
        createdAt: new Date().toString(),
      },
      deployId: "adeployid",
      createdAt: new Date(),
    };
  }

  async deployStatus(_deployId: string): Promise<StatusResponse> {
    return {
      status: "live",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async whenDeployFinished(deployId: string): Promise<StatusResponse> {
    await waitForPollInterval(DUMMY_DEPLOY_WAIT_TIME);
    const status = await this.deployStatus(deployId);
    return status;
  }
}
