export type UserId = string | {};

export interface UserGroups {
  deployers: Set<UserId>;
}

export type UserGroup = keyof UserGroups;

export interface EnvConfig {
  botToken: string;
  clientId: string;
  guildId: string;
  userGroups: UserGroups;
  render: {
    /**
     * API Token for the account that this bot will act as through the Render API.
     */
    apiToken: string;
    /**
     * ID for the account or team that owns the deployed services.
     */
    ownerId: string;
  };
}

export function defineConfig(config: EnvConfig) {
  return config;
}
