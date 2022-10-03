import { App } from "octokit";

import { GithubConfig } from "./GithubConfig";

let config: GithubConfig | undefined;

let app: App | undefined;

export function initializeGithubClient(newConfig: GithubConfig) {
  config = newConfig;
  app = new App({
    appId: config.appId,
    privateKey: config.privateKey,
    webhooks: { secret: config.webhookSecret },
  });
  app.webhooks.on("workflow_job", () => null);
}

export default app;
