import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerProjectTools(server) {
  server.tool(
    "projects",
    "Manage projects: list, get, create, update, delete",
    {
      action: z.enum(["list", "get", "create", "update", "delete"]),
      uuid: z.string().optional().describe("Project UUID"),
      name: z.string().optional(),
      description: z.string().optional(),
    },
    async ({ action, uuid, name, description }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/projects"));
        case "get":
          return ok(await coolifyFetch(`/projects/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/projects", { method: "POST", body: { name, description } }));
        case "update":
          return ok(await coolifyFetch(`/projects/${uuid}`, { method: "PATCH", body: { name, description } }));
        case "delete":
          return ok(await coolifyFetch(`/projects/${uuid}`, { method: "DELETE" }));
      }
    }
  );
}
