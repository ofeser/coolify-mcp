import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerServerTools(server) {
  server.tool(
    "servers",
    "Manage servers: list, get, create, update, delete, validate, resources, domains",
    {
      action: z.enum(["list", "get", "create", "update", "delete", "validate", "resources", "domains"]),
      uuid: z.string().optional().describe("Server UUID (required for get/update/delete/validate/resources/domains)"),
      data: z.record(z.any()).optional().describe("Server data (for create/update)"),
    },
    async ({ action, uuid, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/servers"));
        case "get":
          return ok(await coolifyFetch(`/servers/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/servers", { method: "POST", body: data }));
        case "update":
          return ok(await coolifyFetch(`/servers/${uuid}`, { method: "PATCH", body: data }));
        case "delete":
          return ok(await coolifyFetch(`/servers/${uuid}`, { method: "DELETE" }));
        case "validate":
          return ok(await coolifyFetch(`/servers/${uuid}/validate`));
        case "resources":
          return ok(await coolifyFetch(`/servers/${uuid}/resources`));
        case "domains":
          return ok(await coolifyFetch(`/servers/${uuid}/domains`));
      }
    }
  );
}
