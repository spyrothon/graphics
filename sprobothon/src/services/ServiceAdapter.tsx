export interface VersionResponse {
  name: string;
  commit?: string;
  deployedAt?: Date;
}

export interface StatusResponse {
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DeploySuccessResponse {
  status: "success";
  statusUrl?: string;
  commit: {
    id: string;
    message: string;
    createdAt: string;
  };
  deployId: string;
  createdAt?: Date;
}

export type DeployResponse =
  | DeploySuccessResponse
  | {
      status: "error";
      reason: string;
    };

export class ServiceAdapter {
  async version(): Promise<VersionResponse | undefined> {
    throw new Error(`No "version" method provided by ${this}`);
  }
  async deploy(): Promise<DeployResponse> {
    throw new Error(`No "deploy" method provided by ${this}`);
  }
  async deployStatus(_deployId: string): Promise<StatusResponse> {
    throw new Error(`No "deployStatus" method provided by ${this}`);
  }
  async whenDeployFinished?(_deployId: string): Promise<StatusResponse>;
}
