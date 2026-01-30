import { registerServerTools } from "./servers.js";
import { registerApplicationTools } from "./applications.js";
import { registerDatabaseTools } from "./databases.js";
import { registerServiceTools } from "./services.js";
import { registerProjectTools } from "./projects.js";
import { registerEnvironmentTools } from "./environments.js";
import { registerDeploymentTools } from "./deployments.js";
import { registerEnvVarTools } from "./env-vars.js";
import { registerPrivateKeyTools } from "./private-keys.js";
import { registerTeamTools } from "./teams.js";
import { registerSystemTools } from "./system.js";
import { registerGithubAppTools } from "./github-apps.js";
import { registerCloudTokenTools } from "./cloud-tokens.js";
import { registerResourceTools } from "./resources.js";

export function registerTools(server) {
  registerServerTools(server);
  registerApplicationTools(server);
  registerDatabaseTools(server);
  registerServiceTools(server);
  registerProjectTools(server);
  registerEnvironmentTools(server);
  registerDeploymentTools(server);
  registerEnvVarTools(server);
  registerPrivateKeyTools(server);
  registerTeamTools(server);
  registerSystemTools(server);
  registerGithubAppTools(server);
  registerCloudTokenTools(server);
  registerResourceTools(server);
}
