import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerDeploymentTools(server) {
  server.tool(
    "deployments",
    "Manage deployments: list, get, deploy, cancel, list_by_app",
    {
      action: z.enum(["list", "get", "deploy", "cancel", "list_by_app"]),
      uuid: z.string().optional().describe("Deployment UUID, application UUID, or tag"),
      force: z.boolean().optional().describe("Force rebuild (for deploy)"),
    },
    async ({ action, uuid, force }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/deployments"));
        case "get":
          return ok(await coolifyFetch(`/deployments/${uuid}`));
        case "deploy": {
          const params = force ? { force: "true" } : {};
          return ok(await coolifyFetch(`/deploy`, { method: "POST", params: { uuid, ...params } }));
        }
        case "cancel":
          return ok(await coolifyFetch(`/deployments/${uuid}/cancel`, { method: "POST" }));
        case "list_by_app":
          return ok(await coolifyFetch(`/deployments/${uuid}`));
      }
    }
  );
}
