import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerApplicationTools(server) {
  server.tool(
    "applications",
    `Manage applications: list, get, create (6 source types), update, delete, logs, start, stop, restart.
NOTE: For update, use 'domains' field not 'fqdn'. Tool auto-converts fqdn to domains for compatibility.`,
    {
      action: z.enum(["list", "get", "create", "update", "delete", "logs", "start", "stop", "restart"]),
      uuid: z.string().optional().describe("Application UUID"),
      source_type: z.enum([
        "public", "private-github-app", "private-deploy-key",
        "dockerfile", "dockerimage", "dockercompose",
      ]).optional().describe("Application source type (required for create)"),
      data: z.record(z.any()).optional().describe("Application data (for create/update)"),
      lines: z.number().optional().describe("Number of log lines (for logs action)"),
    },
    async ({ action, uuid, source_type, data, lines }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/applications"));
        case "get":
          return ok(await coolifyFetch(`/applications/${uuid}`));
        case "create": {
          if (!source_type) return err("source_type is required for create action");
          return ok(await coolifyFetch(`/applications/${source_type}`, { method: "POST", body: data }));
        }
        case "update": {
          // Coolify API uses 'domains' not 'fqdn' for updating application domains
          const body = { ...data };
          if (body.fqdn && !body.domains) {
            body.domains = body.fqdn;
            delete body.fqdn;
          }
          return ok(await coolifyFetch(`/applications/${uuid}`, { method: "PATCH", body }));
        }
        case "delete":
          return ok(await coolifyFetch(`/applications/${uuid}`, { method: "DELETE" }));
        case "logs": {
          const params = lines ? { lines } : {};
          return ok(await coolifyFetch(`/applications/${uuid}/logs`, { params }));
        }
        case "start":
          return ok(await coolifyFetch(`/applications/${uuid}/start`));
        case "stop":
          return ok(await coolifyFetch(`/applications/${uuid}/stop`));
        case "restart":
          return ok(await coolifyFetch(`/applications/${uuid}/restart`));
      }
    }
  );
}
