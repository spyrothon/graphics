import { App, Octokit } from "octokit";

import { GithubConfig } from "./GithubConfig";

let config: GithubConfig | undefined;

let app: App | undefined;
let api: Octokit | undefined;

export async function initializeGithubClient(newConfig: GithubConfig) {
  config = newConfig;
  app = new App({
    appId: config.appId,
    privateKey: config.privateKey,
    webhooks: { secret: config.webhookSecret },
  });

  api = await app.getInstallationOctokit(config.installationId);
}

export { app as GithubApp, api as GithubAPI };
