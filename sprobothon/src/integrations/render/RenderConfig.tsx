export interface RenderConfig {
  /**
   * API Token for the account that this bot will act as through the Render API.
   */
  apiToken: string;
  /**
   * ID for the account or team that owns the deployed services.
   */
  ownerId: string;
}
