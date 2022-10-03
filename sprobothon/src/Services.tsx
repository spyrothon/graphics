import { getConfig } from "./Config";
import { ServiceAdapter, ServiceDefinition } from "./ConfigTypes";

export interface DeployStatus {
  provider: ServiceAdapter;
  status:
    | "created"
    | "build_in_progress"
    | "update_in_progress"
    | "live"
    | "deactivated"
    | "build_failed"
    | "update_failed"
    | "canceled";
}

export interface Service {
  name: string;
  deployStatus: DeployStatus;
}

class ServicesManager {
  services: Map<string, ServiceDefinition>;

  #deployableServices: ServiceDefinition[];

  constructor(serviceList: ServiceDefinition[]) {
    this.services = new Map();
    for (const service of serviceList) {
      this.services.set(service.name, service);
    }

    this.#deployableServices = serviceList.filter((service) => service.deployProvider != null);
  }

  getServicesForProvider(provider: ServiceAdapter) {
    return Object.values(this.services).filter(
      (service) => service.deployment.provider === provider,
    );
  }

  getDeployableServices() {
    return this.#deployableServices;
  }

  getServiceByName(name: string): ServiceDefinition | undefined {
    return Object.values(this.services).find((service) => service.name === name);
  }

  getServiceNames() {
    return Object.values(this.services).map((service) => service.name);
  }
}

export default new ServicesManager(getConfig().services);
