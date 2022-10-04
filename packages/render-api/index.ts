/* eslint-disable @typescript-eslint/naming-convention */
import APICore from "api/dist/core";
import Oas from "oas";

import definition from "./openapi.min.json";

export class RenderAPIClient {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, "render-api/1.0.0 (api/5.0.0-beta.3)");
  }

  /**
   * Optionally configure various options, such as response parsing, that the RenderAPIClient allows.
   *
   * @param config Object of supported RenderAPIClient options and toggles.
   * @param config.parseResponse If responses are parsed according to its `Content-Type` header.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the RenderAPIClient which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Access any GET endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  get<T = unknown>(path: string, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, "get", metadata);
  }

  /**
   * Access any POST endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  post<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, "post", body, metadata);
  }

  /**
   * Access any PATCH endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  patch<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, "patch", body, metadata);
  }

  /**
   * Access any DELETE endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  delete<T = unknown>(
    path: string,
    body?: unknown,
    metadata?: Record<string, unknown>,
  ): Promise<T> {
    return this.core.fetch(path, "delete", body, metadata);
  }

  /**
   * Access any PUT endpoint on your API.
   *
   * @param path API path to make a request against.
   * @param body Request body payload data.
   * @param metadata Object containing all path, query, header, and cookie parameters to supply.
   */
  put<T = unknown>(path: string, body?: unknown, metadata?: Record<string, unknown>): Promise<T> {
    return this.core.fetch(path, "put", body, metadata);
  }

  /**
   * List authorized users and teams
   *
   */
  getOwners(metadata?: GetOwnersParams): Promise<ResponseObject<{ owner: Owner }>[]> {
    return this.core.fetch("/owners", "get", metadata);
  }

  /**
   * Retrieve user or team
   *
   */
  getOwner(metadata: GetOwnerParams): Promise<Owner> {
    return this.core.fetch("/owners/{ownerId}", "get", metadata);
  }

  /**
   * List services
   *
   */
  getServices(metadata?: GetServicesParams): Promise<ResponseObject<{ service: Service }>[]> {
    return this.core.fetch("/services", "get", metadata);
  }

  /**
   * Create service
   *
   */
  createService(body: CreateServiceBodyParam): Promise<CreateServiceResponse> {
    return this.core.fetch("/services", "post", body);
  }

  /**
   * Retrieve service
   *
   */
  getService(metadata: { serviceId: string }): Promise<Service> {
    return this.core.fetch("/services/{serviceId}", "get", metadata);
  }

  /**
   * Update service
   *
   */
  updateService(body: UpdateServiceBodyParam, metadata: { serviceId: string }): Promise<Service> {
    return this.core.fetch("/services/{serviceId}", "patch", body, metadata);
  }

  /**
   * Delete service
   *
   */
  deleteService(metadata: { serviceId: string }): Promise<void> {
    return this.core.fetch("/services/{serviceId}", "delete", metadata);
  }

  /**
   * List deploys
   *
   */
  getDeploys(metadata: GetDeploysParams): Promise<ResponseObject<{ deploy: Deploy }>[]> {
    return this.core.fetch("/services/{serviceId}/deploys", "get", metadata);
  }

  /**
   * Trigger a deploy
   *
   */
  createDeploy(
    body: { clearCache?: "clear" | "do_not_clear" },
    metadata: { serviceId: string },
  ): Promise<Deploy> {
    return this.core.fetch("/services/{serviceId}/deploys", "post", body, metadata);
  }

  /**
   * Retrieve deploy
   *
   */
  getDeploy(metadata: { serviceId: string; deployId: string }): Promise<Deploy> {
    return this.core.fetch("/services/{serviceId}/deploys/{deployId}", "get", metadata);
  }

  /**
   * Retrieve environment variables
   *
   */
  getEnvVarsForService(
    metadata: GetEnvVarsForServiceParams,
  ): Promise<ResponseObject<{ envVars: EnvVar }>[]> {
    return this.core.fetch("/services/{serviceId}/env-vars", "get", metadata);
  }

  /**
   * Update environment variables
   *
   */
  updateEnvVarsForService(
    body: EnvVarDefinition[],
    metadata: { serviceId: string },
  ): Promise<ResponseObject<{ envVars: EnvVar }>[]> {
    return this.core.fetch("/services/{serviceId}/env-vars", "put", body, metadata);
  }

  /**
   * Retrieve headers
   *
   */
  getHeaders(
    metadata: GetHeadersMetadataParam,
  ): Promise<ResponseObject<{ headers: ServiceHeaderDefinition }>[]> {
    return this.core.fetch("/services/{serviceId}/headers", "get", metadata);
  }

  /**
   * Retrieve redirect and rewrite rules
   *
   */
  getRoutes(
    metadata: GetRoutesMetadataParam,
  ): Promise<ResponseObject<{ routes: ServiceRouteDefinition }>[]> {
    return this.core.fetch("/services/{serviceId}/routes", "get", metadata);
  }

  /**
   * List custom domains
   *
   */
  getCustomDomains(
    metadata: GetCustomDomainsMetadataParam,
  ): Promise<ResponseObject<{ customDomain: CustomDomain }>> {
    return this.core.fetch("/services/{serviceId}/custom-domains", "get", metadata);
  }

  /**
   * Add custom domain
   *
   */
  createCustomDomain(
    body: { name: string },
    metadata: { serviceId: string },
  ): Promise<CustomDomain[]> {
    return this.core.fetch("/services/{serviceId}/custom-domains", "post", body, metadata);
  }

  /**
   * Retrieve custom domain
   *
   */
  getCustomDomain(metadata: CustomDomainParams): Promise<CustomDomain> {
    return this.core.fetch(
      "/services/{serviceId}/custom-domains/{customDomainIdOrName}",
      "get",
      metadata,
    );
  }

  /**
   * Delete custom domain
   *
   */
  deleteCustomDomain(metadata: CustomDomainParams): Promise<void> {
    return this.core.fetch(
      "/services/{serviceId}/custom-domains/{customDomainIdOrName}",
      "delete",
      metadata,
    );
  }

  /**
   * Verify DNS configuration
   *
   */
  refreshCustomDomain(metadata: CustomDomainParams): Promise<void> {
    return this.core.fetch(
      "/services/{serviceId}/custom-domains/{customDomainIdOrName}/verify",
      "post",
      metadata,
    );
  }

  /**
   * Suspend service
   *
   */
  suspendService(metadata: { serviceId: string }): Promise<void> {
    return this.core.fetch("/services/{serviceId}/suspend", "post", metadata);
  }

  /**
   * Resume service
   *
   */
  resumeService(metadata: { serviceId: string }): Promise<void> {
    return this.core.fetch("/services/{serviceId}/resume", "post", metadata);
  }

  /**
   * Scale service to desired number of instances
   *
   */
  scaleService(body: { numInstances: number }, metadata: { serviceId: string }): Promise<void> {
    return this.core.fetch("/services/{serviceId}/scale", "post", body, metadata);
  }

  /**
   * List jobs
   *
   */
  listJob(metadata: ListJobMetadataParam): Promise<ResponseObject<{ job: Job }>[]> {
    return this.core.fetch("/services/{serviceId}/jobs", "get", metadata);
  }

  /**
   * Create job
   *
   */
  postJob(
    body: {
      startCommand: string;
      planId?: string;
    },
    metadata: { serviceId: string },
  ): Promise<Job> {
    return this.core.fetch("/services/{serviceId}/jobs", "post", body, metadata);
  }

  /**
   * Retrieve job
   *
   */
  getJob(metadata: { serviceId: string; jobId: string }): Promise<Job> {
    return this.core.fetch("/services/{serviceId}/jobs/{jobId}", "get", metadata);
  }
}

export default new RenderAPIClient();

export interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}

export type ResponseObject<T> = {
  cursor: string;
} & T;

export type YesNoString = "yes" | "no";
export type NotifyOnFail = "default" | "notify" | "ignore";
export type Disk = { id?: string; name?: string };
export type EnvVar = { key: string; value: string };
export type ParentServer = { id?: string; name?: string };

export interface Owner {
  id: string;
  name: string;
  email: string;
  type: "user" | "team";
}

export interface Service {
  id: string;
  autoDeploy: YesNoString;
  branch: string;
  createdAt: string;
  name: string;
  notifyOnFail: NotifyOnFail;
  ownerId: string;
  repo: string;
  slug: string;
  suspended: ServiceSuspendedStatus;
  suspenders: ServiceSuspender[];
  type: ServiceType;
  updatedAt: string;
  serviceDetails: ServiceDetails;
}

export type ServiceDetails =
  | StaticSiteServiceDetails
  | WebServiceDetails
  | BackgroundWorkerServiceDetails
  | CronJobServiceDetails;

export interface StaticSiteServiceDetails {
  buildCommand: string;
  parentServer: {
    id: string;
    name: string;
  };
  publishPath: string;
  /**
   * `yes` `no`
   */
  pullRequestPreviewsEnabled: YesNoString;
  url: string;
}

interface BaseServiceDetails {
  disk: Disk;
  env: ServiceEnvironment;
  envSpecificDetails?: WebServiceEnvDetails;
  healthCheckPath: string;
  lastSuccessfulRunAt: string;
  numInstances: number;
  openPorts: OpenPort[];
  parentServer?: ParentServer;
  plan: ServicePlan;
  pullRequestPreviewsEnabled?: YesNoString;
  region: ServiceRegion;
  schedule: string;
  url: string;
}

export type WebServiceEnvDetails =
  | {
      dockerCommand?: string;
      dockerContext?: string;
      dockerfilePath?: string;
    }
  | {
      buildCommand?: string;
      startCommand?: string;
    };

export interface OpenPort {
  port: number;
  protocol: "TCP" | "UDP";
}

export type WebServiceDetails = Omit<BaseServiceDetails, "schedule" | "lastSuccessfulRunAt">;
export type PrivateServiceDetails = Omit<
  BaseServiceDetails,
  "healthCheckPath" | "schedule" | "lastSuccessfulRunAt"
>;
export type BackgroundWorkerServiceDetails = Omit<
  BaseServiceDetails,
  "healthCheckPath" | "openPorts" | "url" | "schedule" | "lastSuccessfulRunAt"
>;
export type CronJobServiceDetails = Omit<
  BaseServiceDetails,
  | "disk"
  | "healthCheckPath"
  | "numInstances"
  | "openPorts"
  | "parentServer"
  | "pullRequestPreviewsEnabled"
  | "url"
>;

export interface Commit {
  id: string;
  message: string;
  createdAt: string;
}

export type JobStatus = "pending" | "running" | "succeeded" | "failed";

export interface Job {
  id: string;
  serviceId: string;
  startCommand: string;
  planId: string;
  status: JobStatus;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
}

export type DeployStatus =
  | "created"
  | "build_in_progress"
  | "update_in_progress"
  | "live"
  | "deactivated"
  | "build_failed"
  | "update_failed"
  | "canceled";

export interface Deploy {
  id: string;
  commit: Commit;
  status: DeployStatus;
  finishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomDomain {
  id: string;
  name: string;
  domainType: "apex" | "subdomain";
  publicSuffix: string;
  redirectForName: string;
  verificationStatus: "verified" | "unverified";
  createdAt: string;
  server: ParentServer;
}

export type ServiceType =
  | "static_site"
  | "web_service"
  | "private_service"
  | "background_worker"
  | "cron_job";
export type ServiceEnvironment = "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
export type ServiceRegion = "oregon" | "frankfurt";
export type ServiceSuspendedStatus = "suspended" | "not_suspended";
export type ServiceSuspender = "admin" | "billing" | "user" | "parent_service" | "unknown";
export type ServicePlan =
  | "starter"
  | "starter_plus"
  | "standard"
  | "standard_plus"
  | "pro"
  | "pro_plus"
  | "pro_max"
  | "pro_ultra"
  | "free"
  | "custom";

export interface ErrorResponse {
  id: string;
  message: string;
}

export interface GetOwnersParams {
  name?: string[];
  email?: string[];
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}
export interface GetOwnerParams {
  /**
   * The ID of the user or team
   */
  ownerId: string;
}
export interface GetServicesParams {
  /**
   * Filter for the names of services
   */
  name?: string[];
  /**
   * Filter for types of services
   */
  type?: ServiceType[];
  /**
   * Filter for environments of services
   */
  env?: ServiceEnvironment[];
  /**
   * Filter for regions of services
   */
  region?: ServiceRegion[];
  /**
   * Filter services based on whether they're suspended or not suspended
   */
  suspended?: ServiceSuspendedStatus[];
  /**
   * Filter for services created before a certain time (specified as an ISO 8601 timestamp)
   */
  createdBefore?: string;
  /**
   * Filter for services created after a certain time (specified as an ISO 8601 timestamp)
   */
  createdAfter?: string;
  /**
   * Filter for services updated before a certain time (specified as an ISO 8601 timestamp)
   */
  updatedBefore?: string;
  /**
   * Filter for services updated after a certain time (specified as an ISO 8601 timestamp)
   */
  updatedAfter?: string;
  /**
   * The ID of the owner (team or personal user) whose resources should be returned
   */
  ownerId?: string[];
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}

export interface ServiceHeaderDefinition {
  path: string;
  name: string;
  value: string;
}
export interface ServiceRouteDefinition {
  type: "redirect" | "rewrite";
  source: string;
  destination: string;
}

export type EnvVarDefinition =
  | { key: string; value: string }
  | { key: string; generateValue: YesNoString };

export interface StaticSiteServiceCreateDetails {
  buildCommand?: string;
  headers?: ServiceHeaderDefinition[];
  publicPath?: string;
  pullRequestPreviewsEnabled?: YesNoString;
  routes?: ServiceRouteDefinition[];
}

export type ServiceDiskDefinition = { name: string; mountPath: string; sizeGB: number };
export type ServiceCreateEnvSpecificDetails =
  | {
      dockerCommand?: string;
      dockerContext?: string;
      dockerfilePath?: string;
    }
  | {
      buildCommand: string;
      startCommand: string;
    };

export interface WebServiceCreateDetails {
  disk?: ServiceDiskDefinition;
  env: ServiceEnvironment;
  envSpecificDetails: ServiceCreateEnvSpecificDetails;
  healthCheckPath?: string;
  numInstances?: number;
  plan?: ServicePlan;
  pullRequestPreviewsEnabled?: YesNoString;
  region?: ServiceRegion;
}

export type PrivateServiceCreateDetails = Omit<WebServiceCreateDetails, "healthCheckPath">;
export type BackgroundWorkerCreateDetails = Omit<WebServiceCreateDetails, "healthCheckPath">;
export type CronJobCreateDetails = Omit<
  WebServiceCreateDetails,
  "disk" | "healthCheckPath" | "numInstances"
> & { schedule: string };

export type ServiceCreateDetails =
  | StaticSiteServiceCreateDetails
  | WebServiceCreateDetails
  | PrivateServiceCreateDetails
  | BackgroundWorkerCreateDetails
  | CronJobCreateDetails;

export interface CreateServiceBodyParam {
  type: ServiceType;
  name: string;
  ownerId: string;
  /**
   * Do not include the branch in the repo string. You can instead supply a 'branch' parameter.
   */
  repo: string;
  /**
   * Defaults to "yes"
   */
  autoDeploy?: YesNoString;
  /**
   * If left empty, this will fall back to the default branch of the repository
   */
  branch?: string;
  envVars?: EnvVarDefinition[];
  secretFiles?: {
    name: string;
    contents: string;
  }[];
  serviceDetails?: ServiceCreateDetails;
}
export interface CreateServiceResponse {
  service: Service;
  deployId: string;
}

export interface UpdateServiceBodyParam {
  autoDeploy?: YesNoString;
  branch?: string;
  name?: string;
  serviceDetails?:
    | {
        buildCommand?: string;
        publishPath?: string;
        pullRequestPreviewsEnabled?: YesNoString;
      }
    | {
        envSpecificDetails?: Partial<ServiceCreateEnvSpecificDetails>;
        healthCheckPath?: string;
        numInstances?: number;
        plan?: ServicePlan;
        pullRequestPreviewsEnabled?: YesNoString;
      }
    | {
        envSpecificDetails?: Partial<ServiceCreateEnvSpecificDetails>;
        numInstances?: number;
        plan?: ServicePlan;
        pullRequestPreviewsEnabled?: YesNoString;
      }
    | {
        envSpecificDetails?: Partial<ServiceCreateEnvSpecificDetails>;
        plan?: ServicePlan;
        schedule?: string;
      };
}

export interface GetDeploysParams {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Epoch/Unix timestamp of start of time range to return
   */
  startTime?: number;
  /**
   * Epoch/Unix timestamp of end of time range to return
   */
  endTime?: number;
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}

export interface GetEnvVarsForServiceParams {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}

export interface GetHeadersMetadataParam {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Filter for specific paths that headers apply to
   */
  path?: string[];
  /**
   * Filter for header names
   */
  name?: string[];
  /**
   * Filter for header values
   */
  value?: string[];
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}

export interface GetRoutesMetadataParam {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Filter for the type of route rule
   */
  type?: ("redirect" | "rewrite")[];
  /**
   * Filter for the source path of the route
   */
  source?: string[];
  /**
   * Filter for the destination path of the route
   */
  destination?: string[];
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
}
export interface GetCustomDomainsMetadataParam {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
  /**
   * Filter for the names of custom domain
   */
  name?: string[];
  /**
   * Filter for apex or subdomains
   */
  domainType?: "apex" | "subdomain";
  /**
   * Filter for verified or unverified custom domains
   */
  verificationStatus?: "verified" | "unverified";
  /**
   * Filter for custom domains created before a certain time (specified as an ISO 8601 timestamp)
   */
  createdBefore?: string;
  /**
   * Filter for custom domains created after a certain time (specified as an ISO 8601 timestamp)
   */
  createdAfter?: string;
}

export interface CustomDomainParams {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID or name of the custom domain
   */
  customDomainIdOrName: string;
}

export interface ListJobMetadataParam {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
  /**
   * Filter for the status of the job (`pending`, `running`, `succeeded`, or `failed`)
   */
  status?: JobStatus[];
  /**
   * Filter for jobs created before a certain time (specified as an ISO 8601 timestamp)
   */
  createdBefore?: string;
  /**
   * Filter for jobs created after a certain time (specified as an ISO 8601 timestamp)
   */
  createdAfter?: string;
  /**
   * Filter for jobs started before a certain time (specified as an ISO 8601 timestamp)
   */
  startedBefore?: string;
  /**
   * Filter for jobs started after a certain time (specified as an ISO 8601 timestamp)
   */
  startedAfter?: string;
  /**
   * Filter for jobs finished before a certain time (specified as an ISO 8601 timestamp)
   */
  finishedBefore?: string;
  /**
   * Filter for jobs finished after a certain time (specified as an ISO 8601 timestamp)
   */
  finishedAfter?: string;
}
