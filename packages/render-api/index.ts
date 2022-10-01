/* eslint-disable @typescript-eslint/naming-convention */
import APICore from "api/dist/core";
import Oas from "oas";

import definition from "./openapi.json";

class SDK {
  spec: Oas;
  core: APICore;
  authKeys: (number | string)[][] = [];

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, "render-api/1.0.0 (api/5.0.0-beta.3)");
  }

  /**
   * Optionally configure various options, such as response parsing, that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
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
   * the SDK which one to use with this method. To use it you can supply either one of the
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
   * List authorized users and teams
   *
   */
  get(
    path: "/owners",
    metadata?: GetOwnersMetadataParam,
  ): Promise<
    | GetOwners_Response_200
    | GetOwners_Response_401
    | GetOwners_Response_406
    | GetOwners_Response_429
    | GetOwners_Response_500
    | GetOwners_Response_503
  >;
  /**
   * Retrieve user or team
   *
   */
  get(
    path: "/owners/{ownerId}",
    metadata: GetOwnerMetadataParam,
  ): Promise<
    | GetOwner_Response_200
    | GetOwner_Response_401
    | GetOwner_Response_404
    | GetOwner_Response_406
    | GetOwner_Response_410
    | GetOwner_Response_429
    | GetOwner_Response_500
    | GetOwner_Response_503
  >;
  /**
   * List services
   *
   */
  get(
    path: "/services",
    metadata?: GetServicesMetadataParam,
  ): Promise<
    | GetServices_Response_200
    | GetServices_Response_401
    | GetServices_Response_406
    | GetServices_Response_429
    | GetServices_Response_500
    | GetServices_Response_503
  >;
  /**
   * Retrieve service
   *
   */
  get(
    path: "/services/{serviceId}",
    metadata: GetServiceMetadataParam,
  ): Promise<
    | GetService_Response_200
    | GetService_Response_401
    | GetService_Response_403
    | GetService_Response_404
    | GetService_Response_406
    | GetService_Response_410
    | GetService_Response_429
    | GetService_Response_500
    | GetService_Response_503
  >;
  /**
   * List deploys
   *
   */
  get(
    path: "/services/{serviceId}/deploys",
    metadata: GetDeploysMetadataParam,
  ): Promise<
    | GetDeploys_Response_200
    | GetDeploys_Response_401
    | GetDeploys_Response_403
    | GetDeploys_Response_404
    | GetDeploys_Response_406
    | GetDeploys_Response_410
    | GetDeploys_Response_429
    | GetDeploys_Response_500
    | GetDeploys_Response_503
  >;
  /**
   * Retrieve deploy
   *
   */
  get(
    path: "/services/{serviceId}/deploys/{deployId}",
    metadata: GetDeployMetadataParam,
  ): Promise<
    | GetDeploy_Response_200
    | GetDeploy_Response_401
    | GetDeploy_Response_403
    | GetDeploy_Response_404
    | GetDeploy_Response_406
    | GetDeploy_Response_410
    | GetDeploy_Response_429
    | GetDeploy_Response_500
    | GetDeploy_Response_503
  >;
  /**
   * Retrieve environment variables
   *
   */
  get(
    path: "/services/{serviceId}/env-vars",
    metadata: GetEnvVarsForServiceMetadataParam,
  ): Promise<
    | GetEnvVarsForService_Response_200
    | GetEnvVarsForService_Response_401
    | GetEnvVarsForService_Response_403
    | GetEnvVarsForService_Response_404
    | GetEnvVarsForService_Response_406
    | GetEnvVarsForService_Response_410
    | GetEnvVarsForService_Response_429
    | GetEnvVarsForService_Response_500
    | GetEnvVarsForService_Response_503
  >;
  /**
   * Retrieve headers
   *
   */
  get(
    path: "/services/{serviceId}/headers",
    metadata: GetHeadersMetadataParam,
  ): Promise<
    | GetHeaders_Response_200
    | GetHeaders_Response_401
    | GetHeaders_Response_403
    | GetHeaders_Response_404
    | GetHeaders_Response_406
    | GetHeaders_Response_410
    | GetHeaders_Response_429
    | GetHeaders_Response_500
    | GetHeaders_Response_503
  >;
  /**
   * Retrieve redirect and rewrite rules
   *
   */
  get(
    path: "/services/{serviceId}/routes",
    metadata: GetRoutesMetadataParam,
  ): Promise<
    | GetRoutes_Response_200
    | GetRoutes_Response_401
    | GetRoutes_Response_403
    | GetRoutes_Response_404
    | GetRoutes_Response_406
    | GetRoutes_Response_410
    | GetRoutes_Response_429
    | GetRoutes_Response_500
    | GetRoutes_Response_503
  >;
  /**
   * List custom domains
   *
   */
  get(
    path: "/services/{serviceId}/custom-domains",
    metadata: GetCustomDomainsMetadataParam,
  ): Promise<
    | GetCustomDomains_Response_200
    | GetCustomDomains_Response_400
    | GetCustomDomains_Response_401
    | GetCustomDomains_Response_403
    | GetCustomDomains_Response_404
    | GetCustomDomains_Response_406
    | GetCustomDomains_Response_410
    | GetCustomDomains_Response_429
    | GetCustomDomains_Response_500
    | GetCustomDomains_Response_503
  >;
  /**
   * Retrieve custom domain
   *
   */
  get(
    path: "/services/{serviceId}/custom-domains/{customDomainIdOrName}",
    metadata: GetCustomDomainMetadataParam,
  ): Promise<
    | GetCustomDomain_Response_200
    | GetCustomDomain_Response_400
    | GetCustomDomain_Response_401
    | GetCustomDomain_Response_403
    | GetCustomDomain_Response_404
    | GetCustomDomain_Response_406
    | GetCustomDomain_Response_410
    | GetCustomDomain_Response_429
    | GetCustomDomain_Response_500
    | GetCustomDomain_Response_503
  >;
  /**
   * List jobs
   *
   */
  get(
    path: "/services/{serviceId}/jobs",
    metadata: ListJobMetadataParam,
  ): Promise<
    | ListJob_Response_200
    | ListJob_Response_400
    | ListJob_Response_401
    | ListJob_Response_404
    | ListJob_Response_429
    | ListJob_Response_500
    | ListJob_Response_503
  >;
  /**
   * Retrieve job
   *
   */
  get(
    path: "/services/{serviceId}/jobs/{jobId}",
    metadata: GetJobMetadataParam,
  ): Promise<
    | GetJob_Response_200
    | GetJob_Response_400
    | GetJob_Response_401
    | GetJob_Response_404
    | GetJob_Response_429
    | GetJob_Response_500
    | GetJob_Response_503
  >;
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
   * Create service
   *
   */
  post(
    path: "/services",
    body: CreateServiceBodyParam,
  ): Promise<
    | CreateService_Response_201
    | CreateService_Response_400
    | CreateService_Response_401
    | CreateService_Response_402
    | CreateService_Response_406
    | CreateService_Response_409
    | CreateService_Response_429
    | CreateService_Response_500
    | CreateService_Response_503
  >;
  /**
   * Trigger a deploy
   *
   */
  post(
    path: "/services/{serviceId}/deploys",
    body: CreateDeployBodyParam,
    metadata: CreateDeployMetadataParam,
  ): Promise<
    | CreateDeploy_Response_201
    | CreateDeploy_Response_400
    | CreateDeploy_Response_401
    | CreateDeploy_Response_404
    | CreateDeploy_Response_406
    | CreateDeploy_Response_409
    | CreateDeploy_Response_410
    | CreateDeploy_Response_429
    | CreateDeploy_Response_500
    | CreateDeploy_Response_503
  >;
  /**
   * Add custom domain
   *
   */
  post(
    path: "/services/{serviceId}/custom-domains",
    body: CreateCustomDomainBodyParam,
    metadata: CreateCustomDomainMetadataParam,
  ): Promise<
    | CreateCustomDomain_Response_201
    | CreateCustomDomain_Response_400
    | CreateCustomDomain_Response_401
    | CreateCustomDomain_Response_402
    | CreateCustomDomain_Response_403
    | CreateCustomDomain_Response_404
    | CreateCustomDomain_Response_406
    | CreateCustomDomain_Response_409
    | CreateCustomDomain_Response_410
    | CreateCustomDomain_Response_429
    | CreateCustomDomain_Response_500
    | CreateCustomDomain_Response_503
  >;
  /**
   * Verify DNS configuration
   *
   */
  post(
    path: "/services/{serviceId}/custom-domains/{customDomainIdOrName}/verify",
    metadata: RefreshCustomDomainMetadataParam,
  ): Promise<
    | RefreshCustomDomain_Response_400
    | RefreshCustomDomain_Response_401
    | RefreshCustomDomain_Response_403
    | RefreshCustomDomain_Response_404
    | RefreshCustomDomain_Response_406
    | RefreshCustomDomain_Response_410
    | RefreshCustomDomain_Response_429
    | RefreshCustomDomain_Response_500
    | RefreshCustomDomain_Response_503
  >;
  /**
   * Suspend service
   *
   */
  post(
    path: "/services/{serviceId}/suspend",
    metadata: SuspendServiceMetadataParam,
  ): Promise<
    | SuspendService_Response_400
    | SuspendService_Response_401
    | SuspendService_Response_403
    | SuspendService_Response_404
    | SuspendService_Response_406
    | SuspendService_Response_410
    | SuspendService_Response_429
    | SuspendService_Response_500
    | SuspendService_Response_503
  >;
  /**
   * Resume service
   *
   */
  post(
    path: "/services/{serviceId}/resume",
    metadata: ResumeServiceMetadataParam,
  ): Promise<
    | ResumeService_Response_400
    | ResumeService_Response_401
    | ResumeService_Response_403
    | ResumeService_Response_404
    | ResumeService_Response_406
    | ResumeService_Response_410
    | ResumeService_Response_429
    | ResumeService_Response_500
    | ResumeService_Response_503
  >;
  /**
   * Scale service to desired number of instances
   *
   */
  post(
    path: "/services/{serviceId}/scale",
    body: ScaleServiceBodyParam,
    metadata: ScaleServiceMetadataParam,
  ): Promise<
    | ScaleService_Response_400
    | ScaleService_Response_401
    | ScaleService_Response_403
    | ScaleService_Response_404
    | ScaleService_Response_406
    | ScaleService_Response_410
    | ScaleService_Response_429
    | ScaleService_Response_500
    | ScaleService_Response_503
  >;
  /**
   * Create job
   *
   */
  post(
    path: "/services/{serviceId}/jobs",
    body: PostJobBodyParam,
    metadata: PostJobMetadataParam,
  ): Promise<
    | PostJob_Response_200
    | PostJob_Response_400
    | PostJob_Response_401
    | PostJob_Response_404
    | PostJob_Response_429
    | PostJob_Response_500
    | PostJob_Response_503
  >;
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
   * Update service
   *
   */
  patch(
    path: "/services/{serviceId}",
    body: UpdateServiceBodyParam,
    metadata: UpdateServiceMetadataParam,
  ): Promise<
    | UpdateService_Response_200
    | UpdateService_Response_400
    | UpdateService_Response_401
    | UpdateService_Response_402
    | UpdateService_Response_403
    | UpdateService_Response_404
    | UpdateService_Response_406
    | UpdateService_Response_409
    | UpdateService_Response_410
    | UpdateService_Response_429
    | UpdateService_Response_500
    | UpdateService_Response_503
  >;
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
   * Delete service
   *
   */
  delete(
    path: "/services/{serviceId}",
    metadata: DeleteServiceMetadataParam,
  ): Promise<
    | DeleteService_Response_401
    | DeleteService_Response_403
    | DeleteService_Response_404
    | DeleteService_Response_406
    | DeleteService_Response_410
    | DeleteService_Response_429
    | DeleteService_Response_500
    | DeleteService_Response_503
  >;
  /**
   * Delete custom domain
   *
   */
  delete(
    path: "/services/{serviceId}/custom-domains/{customDomainIdOrName}",
    metadata: DeleteCustomDomainMetadataParam,
  ): Promise<
    | DeleteCustomDomain_Response_400
    | DeleteCustomDomain_Response_401
    | DeleteCustomDomain_Response_403
    | DeleteCustomDomain_Response_404
    | DeleteCustomDomain_Response_406
    | DeleteCustomDomain_Response_410
    | DeleteCustomDomain_Response_429
    | DeleteCustomDomain_Response_500
    | DeleteCustomDomain_Response_503
  >;
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
   * Update environment variables
   *
   */
  put(
    path: "/services/{serviceId}/env-vars",
    body: UpdateEnvVarsForServiceBodyParam,
    metadata: UpdateEnvVarsForServiceMetadataParam,
  ): Promise<
    | UpdateEnvVarsForService_Response_200
    | UpdateEnvVarsForService_Response_400
    | UpdateEnvVarsForService_Response_401
    | UpdateEnvVarsForService_Response_403
    | UpdateEnvVarsForService_Response_404
    | UpdateEnvVarsForService_Response_406
    | UpdateEnvVarsForService_Response_410
    | UpdateEnvVarsForService_Response_429
    | UpdateEnvVarsForService_Response_500
    | UpdateEnvVarsForService_Response_503
  >;
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
  getOwners(
    metadata?: GetOwnersMetadataParam,
  ): Promise<
    | GetOwners_Response_200
    | GetOwners_Response_401
    | GetOwners_Response_406
    | GetOwners_Response_429
    | GetOwners_Response_500
    | GetOwners_Response_503
  > {
    return this.core.fetch("/owners", "get", metadata);
  }

  /**
   * Retrieve user or team
   *
   */
  getOwner(
    metadata: GetOwnerMetadataParam,
  ): Promise<
    | GetOwner_Response_200
    | GetOwner_Response_401
    | GetOwner_Response_404
    | GetOwner_Response_406
    | GetOwner_Response_410
    | GetOwner_Response_429
    | GetOwner_Response_500
    | GetOwner_Response_503
  > {
    return this.core.fetch("/owners/{ownerId}", "get", metadata);
  }

  /**
   * List services
   *
   */
  getServices(
    metadata?: GetServicesMetadataParam,
  ): Promise<
    | GetServices_Response_200
    | GetServices_Response_401
    | GetServices_Response_406
    | GetServices_Response_429
    | GetServices_Response_500
    | GetServices_Response_503
  > {
    return this.core.fetch("/services", "get", metadata);
  }

  /**
   * Create service
   *
   */
  createService(
    body: CreateServiceBodyParam,
  ): Promise<
    | CreateService_Response_201
    | CreateService_Response_400
    | CreateService_Response_401
    | CreateService_Response_402
    | CreateService_Response_406
    | CreateService_Response_409
    | CreateService_Response_429
    | CreateService_Response_500
    | CreateService_Response_503
  > {
    return this.core.fetch("/services", "post", body);
  }

  /**
   * Retrieve service
   *
   */
  getService(
    metadata: GetServiceMetadataParam,
  ): Promise<
    | GetService_Response_200
    | GetService_Response_401
    | GetService_Response_403
    | GetService_Response_404
    | GetService_Response_406
    | GetService_Response_410
    | GetService_Response_429
    | GetService_Response_500
    | GetService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}", "get", metadata);
  }

  /**
   * Update service
   *
   */
  updateService(
    body: UpdateServiceBodyParam,
    metadata: UpdateServiceMetadataParam,
  ): Promise<
    | UpdateService_Response_200
    | UpdateService_Response_400
    | UpdateService_Response_401
    | UpdateService_Response_402
    | UpdateService_Response_403
    | UpdateService_Response_404
    | UpdateService_Response_406
    | UpdateService_Response_409
    | UpdateService_Response_410
    | UpdateService_Response_429
    | UpdateService_Response_500
    | UpdateService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}", "patch", body, metadata);
  }

  /**
   * Delete service
   *
   */
  deleteService(
    metadata: DeleteServiceMetadataParam,
  ): Promise<
    | DeleteService_Response_401
    | DeleteService_Response_403
    | DeleteService_Response_404
    | DeleteService_Response_406
    | DeleteService_Response_410
    | DeleteService_Response_429
    | DeleteService_Response_500
    | DeleteService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}", "delete", metadata);
  }

  /**
   * List deploys
   *
   */
  getDeploys(
    metadata: GetDeploysMetadataParam,
  ): Promise<
    | GetDeploys_Response_200
    | GetDeploys_Response_401
    | GetDeploys_Response_403
    | GetDeploys_Response_404
    | GetDeploys_Response_406
    | GetDeploys_Response_410
    | GetDeploys_Response_429
    | GetDeploys_Response_500
    | GetDeploys_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/deploys", "get", metadata);
  }

  /**
   * Trigger a deploy
   *
   */
  createDeploy(
    body: CreateDeployBodyParam,
    metadata: CreateDeployMetadataParam,
  ): Promise<
    | CreateDeploy_Response_201
    | CreateDeploy_Response_400
    | CreateDeploy_Response_401
    | CreateDeploy_Response_404
    | CreateDeploy_Response_406
    | CreateDeploy_Response_409
    | CreateDeploy_Response_410
    | CreateDeploy_Response_429
    | CreateDeploy_Response_500
    | CreateDeploy_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/deploys", "post", body, metadata);
  }

  /**
   * Retrieve deploy
   *
   */
  getDeploy(
    metadata: GetDeployMetadataParam,
  ): Promise<
    | GetDeploy_Response_200
    | GetDeploy_Response_401
    | GetDeploy_Response_403
    | GetDeploy_Response_404
    | GetDeploy_Response_406
    | GetDeploy_Response_410
    | GetDeploy_Response_429
    | GetDeploy_Response_500
    | GetDeploy_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/deploys/{deployId}", "get", metadata);
  }

  /**
   * Retrieve environment variables
   *
   */
  getEnvVarsForService(
    metadata: GetEnvVarsForServiceMetadataParam,
  ): Promise<
    | GetEnvVarsForService_Response_200
    | GetEnvVarsForService_Response_401
    | GetEnvVarsForService_Response_403
    | GetEnvVarsForService_Response_404
    | GetEnvVarsForService_Response_406
    | GetEnvVarsForService_Response_410
    | GetEnvVarsForService_Response_429
    | GetEnvVarsForService_Response_500
    | GetEnvVarsForService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/env-vars", "get", metadata);
  }

  /**
   * Update environment variables
   *
   */
  updateEnvVarsForService(
    body: UpdateEnvVarsForServiceBodyParam,
    metadata: UpdateEnvVarsForServiceMetadataParam,
  ): Promise<
    | UpdateEnvVarsForService_Response_200
    | UpdateEnvVarsForService_Response_400
    | UpdateEnvVarsForService_Response_401
    | UpdateEnvVarsForService_Response_403
    | UpdateEnvVarsForService_Response_404
    | UpdateEnvVarsForService_Response_406
    | UpdateEnvVarsForService_Response_410
    | UpdateEnvVarsForService_Response_429
    | UpdateEnvVarsForService_Response_500
    | UpdateEnvVarsForService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/env-vars", "put", body, metadata);
  }

  /**
   * Retrieve headers
   *
   */
  getHeaders(
    metadata: GetHeadersMetadataParam,
  ): Promise<
    | GetHeaders_Response_200
    | GetHeaders_Response_401
    | GetHeaders_Response_403
    | GetHeaders_Response_404
    | GetHeaders_Response_406
    | GetHeaders_Response_410
    | GetHeaders_Response_429
    | GetHeaders_Response_500
    | GetHeaders_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/headers", "get", metadata);
  }

  /**
   * Retrieve redirect and rewrite rules
   *
   */
  getRoutes(
    metadata: GetRoutesMetadataParam,
  ): Promise<
    | GetRoutes_Response_200
    | GetRoutes_Response_401
    | GetRoutes_Response_403
    | GetRoutes_Response_404
    | GetRoutes_Response_406
    | GetRoutes_Response_410
    | GetRoutes_Response_429
    | GetRoutes_Response_500
    | GetRoutes_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/routes", "get", metadata);
  }

  /**
   * List custom domains
   *
   */
  getCustomDomains(
    metadata: GetCustomDomainsMetadataParam,
  ): Promise<
    | GetCustomDomains_Response_200
    | GetCustomDomains_Response_400
    | GetCustomDomains_Response_401
    | GetCustomDomains_Response_403
    | GetCustomDomains_Response_404
    | GetCustomDomains_Response_406
    | GetCustomDomains_Response_410
    | GetCustomDomains_Response_429
    | GetCustomDomains_Response_500
    | GetCustomDomains_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/custom-domains", "get", metadata);
  }

  /**
   * Add custom domain
   *
   */
  createCustomDomain(
    body: CreateCustomDomainBodyParam,
    metadata: CreateCustomDomainMetadataParam,
  ): Promise<
    | CreateCustomDomain_Response_201
    | CreateCustomDomain_Response_400
    | CreateCustomDomain_Response_401
    | CreateCustomDomain_Response_402
    | CreateCustomDomain_Response_403
    | CreateCustomDomain_Response_404
    | CreateCustomDomain_Response_406
    | CreateCustomDomain_Response_409
    | CreateCustomDomain_Response_410
    | CreateCustomDomain_Response_429
    | CreateCustomDomain_Response_500
    | CreateCustomDomain_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/custom-domains", "post", body, metadata);
  }

  /**
   * Retrieve custom domain
   *
   */
  getCustomDomain(
    metadata: GetCustomDomainMetadataParam,
  ): Promise<
    | GetCustomDomain_Response_200
    | GetCustomDomain_Response_400
    | GetCustomDomain_Response_401
    | GetCustomDomain_Response_403
    | GetCustomDomain_Response_404
    | GetCustomDomain_Response_406
    | GetCustomDomain_Response_410
    | GetCustomDomain_Response_429
    | GetCustomDomain_Response_500
    | GetCustomDomain_Response_503
  > {
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
  deleteCustomDomain(
    metadata: DeleteCustomDomainMetadataParam,
  ): Promise<
    | DeleteCustomDomain_Response_400
    | DeleteCustomDomain_Response_401
    | DeleteCustomDomain_Response_403
    | DeleteCustomDomain_Response_404
    | DeleteCustomDomain_Response_406
    | DeleteCustomDomain_Response_410
    | DeleteCustomDomain_Response_429
    | DeleteCustomDomain_Response_500
    | DeleteCustomDomain_Response_503
  > {
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
  refreshCustomDomain(
    metadata: RefreshCustomDomainMetadataParam,
  ): Promise<
    | RefreshCustomDomain_Response_400
    | RefreshCustomDomain_Response_401
    | RefreshCustomDomain_Response_403
    | RefreshCustomDomain_Response_404
    | RefreshCustomDomain_Response_406
    | RefreshCustomDomain_Response_410
    | RefreshCustomDomain_Response_429
    | RefreshCustomDomain_Response_500
    | RefreshCustomDomain_Response_503
  > {
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
  suspendService(
    metadata: SuspendServiceMetadataParam,
  ): Promise<
    | SuspendService_Response_400
    | SuspendService_Response_401
    | SuspendService_Response_403
    | SuspendService_Response_404
    | SuspendService_Response_406
    | SuspendService_Response_410
    | SuspendService_Response_429
    | SuspendService_Response_500
    | SuspendService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/suspend", "post", metadata);
  }

  /**
   * Resume service
   *
   */
  resumeService(
    metadata: ResumeServiceMetadataParam,
  ): Promise<
    | ResumeService_Response_400
    | ResumeService_Response_401
    | ResumeService_Response_403
    | ResumeService_Response_404
    | ResumeService_Response_406
    | ResumeService_Response_410
    | ResumeService_Response_429
    | ResumeService_Response_500
    | ResumeService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/resume", "post", metadata);
  }

  /**
   * Scale service to desired number of instances
   *
   */
  scaleService(
    body: ScaleServiceBodyParam,
    metadata: ScaleServiceMetadataParam,
  ): Promise<
    | ScaleService_Response_400
    | ScaleService_Response_401
    | ScaleService_Response_403
    | ScaleService_Response_404
    | ScaleService_Response_406
    | ScaleService_Response_410
    | ScaleService_Response_429
    | ScaleService_Response_500
    | ScaleService_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/scale", "post", body, metadata);
  }

  /**
   * List jobs
   *
   */
  listJob(
    metadata: ListJobMetadataParam,
  ): Promise<
    | ListJob_Response_200
    | ListJob_Response_400
    | ListJob_Response_401
    | ListJob_Response_404
    | ListJob_Response_429
    | ListJob_Response_500
    | ListJob_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/jobs", "get", metadata);
  }

  /**
   * Create job
   *
   */
  postJob(
    body: PostJobBodyParam,
    metadata: PostJobMetadataParam,
  ): Promise<
    | PostJob_Response_200
    | PostJob_Response_400
    | PostJob_Response_401
    | PostJob_Response_404
    | PostJob_Response_429
    | PostJob_Response_500
    | PostJob_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/jobs", "post", body, metadata);
  }

  /**
   * Retrieve job
   *
   */
  getJob(
    metadata: GetJobMetadataParam,
  ): Promise<
    | GetJob_Response_200
    | GetJob_Response_400
    | GetJob_Response_401
    | GetJob_Response_404
    | GetJob_Response_429
    | GetJob_Response_500
    | GetJob_Response_503
  > {
    return this.core.fetch("/services/{serviceId}/jobs/{jobId}", "get", metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export interface ConfigOptions {
  /**
   * By default we parse the response based on the `Content-Type` header of the request. You
   * can disable this functionality by negating this option.
   */
  parseResponse: boolean;
}
export type GetOwnersMetadataParam = {
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
  [k: string]: unknown;
};
export type GetOwners_Response_200 = {
  owner?: {
    id: string;
    name?: string;
    email?: string;
    /**
     * `user` `team`
     */
    type?: "user" | "team";
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetOwners_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwners_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwners_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwners_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwners_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetOwnerMetadataParam = {
  /**
   * The ID of the user or team
   */
  ownerId: string;
  [k: string]: unknown;
};
export interface GetOwner_Response_200 {
  id: string;
  name?: string;
  email?: string;
  /**
   * `user` `team`
   */
  type?: "user" | "team";
  [k: string]: unknown;
}
export interface GetOwner_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetOwner_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetServicesMetadataParam = {
  /**
   * Filter for the names of services
   */
  name?: string[];
  /**
   * Filter for types of services
   */
  type?: ("static_site" | "web_service" | "private_service" | "background_worker" | "cron_job")[];
  /**
   * Filter for environments of services
   */
  env?: ("docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust")[];
  /**
   * Filter for regions of services
   */
  region?: ("oregon" | "frankfurt")[];
  /**
   * Filter services based on whether they're suspended or not suspended
   */
  suspended?: ("suspended" | "not_suspended")[];
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
  [k: string]: unknown;
};
export type GetServices_Response_200 = {
  service?: {
    id?: string;
    /**
     * `yes` `no`
     */
    autoDeploy?: "yes" | "no";
    branch?: string;
    createdAt?: string;
    name?: string;
    /**
     * `default` `notify` `ignore`
     */
    notifyOnFail?: "default" | "notify" | "ignore";
    ownerId?: string;
    repo?: string;
    slug?: string;
    /**
     * `suspended` `not_suspended`
     */
    suspended?: "suspended" | "not_suspended";
    suspenders?: ("admin" | "billing" | "user" | "parent_service" | "unknown")[];
    /**
     * `static_site` `web_service` `private_service` `background_worker` `cron_job`
     */
    type?: "static_site" | "web_service" | "private_service" | "background_worker" | "cron_job";
    updatedAt?: string;
    serviceDetails?:
      | {
          buildCommand?: string;
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          publishPath?: string;
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          healthCheckPath?: string;
          numInstances?: number;
          openPorts?: {
            port?: number;
            /**
             * `TCP` `UDP`
             */
            protocol?: "TCP" | "UDP";
            [k: string]: unknown;
          }[];
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `free` `custom`
           */
          plan?:
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
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          numInstances?: number;
          openPorts?: {
            port?: number;
            /**
             * `TCP` `UDP`
             */
            protocol?: "TCP" | "UDP";
            [k: string]: unknown;
          }[];
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          numInstances?: number;
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          [k: string]: unknown;
        }
      | {
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          lastSuccessfulRunAt?: string;
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          schedule?: string;
          [k: string]: unknown;
        };
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetServices_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetServices_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetServices_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetServices_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetServices_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateServiceBodyParam {
  type: "static_site" | "web_service" | "private_service" | "background_worker" | "cron_job";
  name: string;
  ownerId: string;
  /**
   * Do not include the branch in the repo string. You can instead supply a 'branch' parameter.
   */
  repo: string;
  /**
   * Defaults to "yes"
   */
  autoDeploy?: "yes" | "no";
  /**
   * If left empty, this will fall back to the default branch of the repository
   */
  branch?: string;
  envVars?: (
    | {
        key: string;
        value: string;
        [k: string]: unknown;
      }
    | {
        key: string;
        generateValue: "yes" | "no";
        [k: string]: unknown;
      }
  )[];
  secretFiles?: {
    name: string;
    contents: string;
    [k: string]: unknown;
  }[];
  serviceDetails?:
    | {
        buildCommand?: string;
        headers?: {
          path: string;
          name: string;
          value: string;
          [k: string]: unknown;
        }[];
        /**
         * Defaults to "public"
         */
        publishPath?: string;
        /**
         * Defaults to "no"
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        routes?: {
          type: "redirect" | "rewrite";
          source: string;
          destination: string;
          [k: string]: unknown;
        }[];
        [k: string]: unknown;
      }
    | {
        disk?: {
          name: string;
          mountPath: string;
          /**
           * Defaults to 1
           */
          sizeGB?: number;
          [k: string]: unknown;
        };
        env: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              /**
               * Defaults to "./Dockerfile"
               */
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand: string;
              startCommand: string;
              [k: string]: unknown;
            };
        healthCheckPath?: string;
        /**
         * Defaults to 1
         */
        numInstances?: number;
        /**
         * Defaults to "starter"
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        /**
         * Defaults to "no"
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * Defaults to "oregon"
         */
        region?: "oregon" | "frankfurt";
        [k: string]: unknown;
      }
    | {
        disk?: {
          name: string;
          mountPath: string;
          /**
           * Defaults to 1
           */
          sizeGB?: number;
          [k: string]: unknown;
        };
        env: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              /**
               * Defaults to "./Dockerfile"
               */
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand: string;
              startCommand: string;
              [k: string]: unknown;
            };
        /**
         * Defaults to 1
         */
        numInstances?: number;
        /**
         * Defaults to "starter"
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        /**
         * Defaults to "no"
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * Defaults to "oregon"
         */
        region?: "oregon" | "frankfurt";
        [k: string]: unknown;
      }
    | {
        env: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              /**
               * Defaults to "./Dockerfile"
               */
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand: string;
              startCommand: string;
              [k: string]: unknown;
            };
        /**
         * Defaults to "starter"
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        /**
         * Defaults to "oregon"
         */
        region?: "oregon" | "frankfurt";
        schedule: string;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
export interface CreateService_Response_201 {
  service?: {
    id?: string;
    /**
     * `yes` `no`
     */
    autoDeploy?: "yes" | "no";
    branch?: string;
    createdAt?: string;
    name?: string;
    /**
     * `default` `notify` `ignore`
     */
    notifyOnFail?: "default" | "notify" | "ignore";
    ownerId?: string;
    repo?: string;
    slug?: string;
    /**
     * `suspended` `not_suspended`
     */
    suspended?: "suspended" | "not_suspended";
    suspenders?: ("admin" | "billing" | "user" | "parent_service" | "unknown")[];
    /**
     * `static_site` `web_service` `private_service` `background_worker` `cron_job`
     */
    type?: "static_site" | "web_service" | "private_service" | "background_worker" | "cron_job";
    updatedAt?: string;
    serviceDetails?:
      | {
          buildCommand?: string;
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          publishPath?: string;
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          healthCheckPath?: string;
          numInstances?: number;
          openPorts?: {
            port?: number;
            /**
             * `TCP` `UDP`
             */
            protocol?: "TCP" | "UDP";
            [k: string]: unknown;
          }[];
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `free` `custom`
           */
          plan?:
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
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          numInstances?: number;
          openPorts?: {
            port?: number;
            /**
             * `TCP` `UDP`
             */
            protocol?: "TCP" | "UDP";
            [k: string]: unknown;
          }[];
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          url?: string;
          [k: string]: unknown;
        }
      | {
          disk?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          numInstances?: number;
          parentServer?: {
            id?: string;
            name?: string;
            [k: string]: unknown;
          };
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `yes` `no`
           */
          pullRequestPreviewsEnabled?: "yes" | "no";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          [k: string]: unknown;
        }
      | {
          /**
           * `docker` `elixir` `go` `node` `python` `ruby` `rust`
           */
          env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
          envSpecificDetails?:
            | {
                dockerCommand?: string;
                dockerContext?: string;
                dockerfilePath?: string;
                [k: string]: unknown;
              }
            | {
                buildCommand?: string;
                startCommand?: string;
                [k: string]: unknown;
              };
          lastSuccessfulRunAt?: string;
          /**
           * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
           */
          plan?:
            | "starter"
            | "starter_plus"
            | "standard"
            | "standard_plus"
            | "pro"
            | "pro_plus"
            | "pro_max"
            | "pro_ultra"
            | "custom";
          /**
           * `oregon` `frankfurt`
           */
          region?: "oregon" | "frankfurt";
          schedule?: string;
          [k: string]: unknown;
        };
    [k: string]: unknown;
  };
  deployId?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_402 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_409 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface GetService_Response_200 {
  id?: string;
  /**
   * `yes` `no`
   */
  autoDeploy?: "yes" | "no";
  branch?: string;
  createdAt?: string;
  name?: string;
  /**
   * `default` `notify` `ignore`
   */
  notifyOnFail?: "default" | "notify" | "ignore";
  ownerId?: string;
  repo?: string;
  slug?: string;
  /**
   * `suspended` `not_suspended`
   */
  suspended?: "suspended" | "not_suspended";
  suspenders?: ("admin" | "billing" | "user" | "parent_service" | "unknown")[];
  /**
   * `static_site` `web_service` `private_service` `background_worker` `cron_job`
   */
  type?: "static_site" | "web_service" | "private_service" | "background_worker" | "cron_job";
  updatedAt?: string;
  serviceDetails?:
    | {
        buildCommand?: string;
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        publishPath?: string;
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        healthCheckPath?: string;
        numInstances?: number;
        openPorts?: {
          port?: number;
          /**
           * `TCP` `UDP`
           */
          protocol?: "TCP" | "UDP";
          [k: string]: unknown;
        }[];
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `free` `custom`
         */
        plan?:
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
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        numInstances?: number;
        openPorts?: {
          port?: number;
          /**
           * `TCP` `UDP`
           */
          protocol?: "TCP" | "UDP";
          [k: string]: unknown;
        }[];
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        numInstances?: number;
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        [k: string]: unknown;
      }
    | {
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        lastSuccessfulRunAt?: string;
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        schedule?: string;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
export interface GetService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateServiceBodyParam {
  autoDeploy?: "yes" | "no";
  branch?: string;
  name?: string;
  serviceDetails?:
    | {
        buildCommand?: string;
        publishPath?: string;
        pullRequestPreviewsEnabled?: "yes" | "no";
        [k: string]: unknown;
      }
    | {
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        healthCheckPath?: string;
        numInstances?: number;
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        pullRequestPreviewsEnabled?: "yes" | "no";
        [k: string]: unknown;
      }
    | {
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        numInstances?: number;
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        pullRequestPreviewsEnabled?: "yes" | "no";
        [k: string]: unknown;
      }
    | {
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra";
        schedule?: string;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
export type UpdateServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface UpdateService_Response_200 {
  id?: string;
  /**
   * `yes` `no`
   */
  autoDeploy?: "yes" | "no";
  branch?: string;
  createdAt?: string;
  name?: string;
  /**
   * `default` `notify` `ignore`
   */
  notifyOnFail?: "default" | "notify" | "ignore";
  ownerId?: string;
  repo?: string;
  slug?: string;
  /**
   * `suspended` `not_suspended`
   */
  suspended?: "suspended" | "not_suspended";
  suspenders?: ("admin" | "billing" | "user" | "parent_service" | "unknown")[];
  /**
   * `static_site` `web_service` `private_service` `background_worker` `cron_job`
   */
  type?: "static_site" | "web_service" | "private_service" | "background_worker" | "cron_job";
  updatedAt?: string;
  serviceDetails?:
    | {
        buildCommand?: string;
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        publishPath?: string;
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        healthCheckPath?: string;
        numInstances?: number;
        openPorts?: {
          port?: number;
          /**
           * `TCP` `UDP`
           */
          protocol?: "TCP" | "UDP";
          [k: string]: unknown;
        }[];
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `free` `custom`
         */
        plan?:
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
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        numInstances?: number;
        openPorts?: {
          port?: number;
          /**
           * `TCP` `UDP`
           */
          protocol?: "TCP" | "UDP";
          [k: string]: unknown;
        }[];
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        url?: string;
        [k: string]: unknown;
      }
    | {
        disk?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        numInstances?: number;
        parentServer?: {
          id?: string;
          name?: string;
          [k: string]: unknown;
        };
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `yes` `no`
         */
        pullRequestPreviewsEnabled?: "yes" | "no";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        [k: string]: unknown;
      }
    | {
        /**
         * `docker` `elixir` `go` `node` `python` `ruby` `rust`
         */
        env?: "docker" | "elixir" | "go" | "node" | "python" | "ruby" | "rust";
        envSpecificDetails?:
          | {
              dockerCommand?: string;
              dockerContext?: string;
              dockerfilePath?: string;
              [k: string]: unknown;
            }
          | {
              buildCommand?: string;
              startCommand?: string;
              [k: string]: unknown;
            };
        lastSuccessfulRunAt?: string;
        /**
         * `starter` `starter_plus` `standard` `standard_plus` `pro` `pro_plus` `pro_max` `pro_ultra` `custom`
         */
        plan?:
          | "starter"
          | "starter_plus"
          | "standard"
          | "standard_plus"
          | "pro"
          | "pro_plus"
          | "pro_max"
          | "pro_ultra"
          | "custom";
        /**
         * `oregon` `frankfurt`
         */
        region?: "oregon" | "frankfurt";
        schedule?: string;
        [k: string]: unknown;
      };
  [k: string]: unknown;
}
export interface UpdateService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_402 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_409 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type DeleteServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface DeleteService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetDeploysMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
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
  [k: string]: unknown;
};
export type GetDeploys_Response_200 = {
  deploy?: {
    id: string;
    commit?: {
      id?: string;
      message?: string;
      createdAt?: string;
      [k: string]: unknown;
    };
    /**
     * `created` `build_in_progress` `update_in_progress` `live` `deactivated` `build_failed` `update_failed` `canceled`
     */
    status?:
      | "created"
      | "build_in_progress"
      | "update_in_progress"
      | "live"
      | "deactivated"
      | "build_failed"
      | "update_failed"
      | "canceled";
    finishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetDeploys_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploys_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeployBodyParam {
  /**
   * Defaults to "do_not_clear"
   */
  clearCache?: "clear" | "do_not_clear";
  [k: string]: unknown;
}
export type CreateDeployMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface CreateDeploy_Response_201 {
  id: string;
  commit?: {
    id?: string;
    message?: string;
    createdAt?: string;
    [k: string]: unknown;
  };
  /**
   * `created` `build_in_progress` `update_in_progress` `live` `deactivated` `build_failed` `update_failed` `canceled`
   */
  status?:
    | "created"
    | "build_in_progress"
    | "update_in_progress"
    | "live"
    | "deactivated"
    | "build_failed"
    | "update_failed"
    | "canceled";
  finishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_409 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateDeploy_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetDeployMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID of the deploy
   */
  deployId: string;
  [k: string]: unknown;
};
export interface GetDeploy_Response_200 {
  id: string;
  commit?: {
    id?: string;
    message?: string;
    createdAt?: string;
    [k: string]: unknown;
  };
  /**
   * `created` `build_in_progress` `update_in_progress` `live` `deactivated` `build_failed` `update_failed` `canceled`
   */
  status?:
    | "created"
    | "build_in_progress"
    | "update_in_progress"
    | "live"
    | "deactivated"
    | "build_failed"
    | "update_failed"
    | "canceled";
  finishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetDeploy_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetEnvVarsForServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
  /**
   * Cursor to begin retrieving entries for this query
   */
  cursor?: string;
  /**
   * Max number of items that can be returned
   */
  limit?: number;
  [k: string]: unknown;
};
export type GetEnvVarsForService_Response_200 = {
  envVar?: {
    key: string;
    value: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetEnvVarsForService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetEnvVarsForService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type UpdateEnvVarsForServiceBodyParam = (
  | {
      key: string;
      value: string;
      [k: string]: unknown;
    }
  | {
      key: string;
      generateValue: "yes" | "no";
      [k: string]: unknown;
    }
)[];
export type UpdateEnvVarsForServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export type UpdateEnvVarsForService_Response_200 = {
  envVar?: {
    key: string;
    value: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface UpdateEnvVarsForService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface UpdateEnvVarsForService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetHeadersMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
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
  [k: string]: unknown;
};
export type GetHeaders_Response_200 = {
  headers?: {
    path: string;
    name: string;
    value: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetHeaders_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetHeaders_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetRoutesMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
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
  [k: string]: unknown;
};
export type GetRoutes_Response_200 = {
  routes?: {
    /**
     * `redirect` `rewrite`
     */
    type: "redirect" | "rewrite";
    source: string;
    destination: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetRoutes_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetRoutes_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetCustomDomainsMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
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
  [k: string]: unknown;
};
export type GetCustomDomains_Response_200 = {
  customDomain?: {
    id?: string;
    name?: string;
    /**
     * `apex` `subdomain`
     */
    domainType?: "apex" | "subdomain";
    publicSuffix?: string;
    redirectForName?: string;
    /**
     * `verified` `unverified`
     */
    verificationStatus?: "verified" | "unverified";
    createdAt?: string;
    server?: {
      id?: string;
      name?: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface GetCustomDomains_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomains_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomainBodyParam {
  name: string;
  [k: string]: unknown;
}
export type CreateCustomDomainMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export type CreateCustomDomain_Response_201 = {
  id?: string;
  name?: string;
  /**
   * `apex` `subdomain`
   */
  domainType?: "apex" | "subdomain";
  publicSuffix?: string;
  redirectForName?: string;
  /**
   * `verified` `unverified`
   */
  verificationStatus?: "verified" | "unverified";
  createdAt?: string;
  server?: {
    id?: string;
    name?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}[];
export interface CreateCustomDomain_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_402 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_409 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface CreateCustomDomain_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetCustomDomainMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID or name of the custom domain
   */
  customDomainIdOrName: string;
  [k: string]: unknown;
};
export interface GetCustomDomain_Response_200 {
  id?: string;
  name?: string;
  /**
   * `apex` `subdomain`
   */
  domainType?: "apex" | "subdomain";
  publicSuffix?: string;
  redirectForName?: string;
  /**
   * `verified` `unverified`
   */
  verificationStatus?: "verified" | "unverified";
  createdAt?: string;
  server?: {
    id?: string;
    name?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetCustomDomain_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type DeleteCustomDomainMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID or name of the custom domain
   */
  customDomainIdOrName: string;
  [k: string]: unknown;
};
export interface DeleteCustomDomain_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface DeleteCustomDomain_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type RefreshCustomDomainMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID or name of the custom domain
   */
  customDomainIdOrName: string;
  [k: string]: unknown;
};
export interface RefreshCustomDomain_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface RefreshCustomDomain_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type SuspendServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface SuspendService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface SuspendService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type ResumeServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface ResumeService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ResumeService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleServiceBodyParam {
  numInstances: number;
  [k: string]: unknown;
}
export type ScaleServiceMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface ScaleService_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_403 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_406 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_410 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ScaleService_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type ListJobMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
} & {
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
  status?: ("pending" | "running" | "succeeded" | "failed")[];
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
  [k: string]: unknown;
};
export type ListJob_Response_200 = {
  job?: {
    id?: string;
    serviceId?: string;
    startCommand?: string;
    planId?: string;
    status?: string;
    createdAt?: string;
    startedAt?: string;
    finishedAt?: string;
    [k: string]: unknown;
  };
  cursor?: string;
  [k: string]: unknown;
}[];
export interface ListJob_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ListJob_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ListJob_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ListJob_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ListJob_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface ListJob_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJobBodyParam {
  startCommand: string;
  planId?: string;
  [k: string]: unknown;
}
export type PostJobMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  [k: string]: unknown;
};
export interface PostJob_Response_200 {
  id?: string;
  serviceId?: string;
  startCommand?: string;
  planId?: string;
  status?: string;
  createdAt?: string;
  startedAt?: string;
  finishedAt?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface PostJob_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export type GetJobMetadataParam = {
  /**
   * The ID of the service
   */
  serviceId: string;
  /**
   * The ID of the job
   */
  jobId: string;
  [k: string]: unknown;
};
export interface GetJob_Response_200 {
  id?: string;
  serviceId?: string;
  startCommand?: string;
  planId?: string;
  status?: string;
  createdAt?: string;
  startedAt?: string;
  finishedAt?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_400 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_401 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_404 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_429 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_500 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
export interface GetJob_Response_503 {
  id?: string;
  message?: string;
  [k: string]: unknown;
}
