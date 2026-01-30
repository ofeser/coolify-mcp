import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerEnvironmentTools(server) {
  server.tool(
    "environments",
    "Manage project environments: list, get, create, delete",
    {
      action: z.enum(["list", "get", "create", "delete"]),
      project_uuid: z.string().describe("Project UUID"),
      name: z.string().optional().describe("Environment name"),
    },
    async ({ action, project_uuid, name }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch(`/projects/${project_uuid}/environments`));
        case "get":
          return ok(await coolifyFetch(`/projects/environments/${name}`));
        case "create":
          return ok(await coolifyFetch(`/projects/${project_uuid}/environments`, { method: "POST", body: { name } }));
        case "delete":
          return ok(await coolifyFetch(`/projects/environments/${name}`, { method: "DELETE" }));
      }
    }
  );
}
