import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerGithubAppTools(server) {
  server.tool(
    "github_apps",
    "Manage GitHub Apps: list, get, create, update, delete",
    {
      action: z.enum(["list", "get", "create", "update", "delete"]),
      id: z.number().optional().describe("GitHub App ID"),
      data: z.record(z.any()).optional().describe("GitHub App data (for create/update)"),
    },
    async ({ action, id, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/github-apps"));
        case "get":
          return ok(await coolifyFetch(`/github-apps/${id}`));
        case "create":
          return ok(await coolifyFetch("/github-apps", { method: "POST", body: data }));
        case "update":
          return ok(await coolifyFetch(`/github-apps/${id}`, { method: "PATCH", body: data }));
        case "delete":
          return ok(await coolifyFetch(`/github-apps/${id}`, { method: "DELETE" }));
      }
    }
  );
}
