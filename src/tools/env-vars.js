import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerEnvVarTools(server) {
  server.tool(
    "env_vars",
    "Manage environment variables for applications or services: list, create, update, update_bulk, delete",
    {
      action: z.enum(["list", "create", "update", "update_bulk", "delete"]),
      resource: z.enum(["applications", "services"]).describe("Resource type"),
      uuid: z.string().describe("Resource UUID"),
      key: z.string().optional(),
      value: z.string().optional(),
      is_build_time: z.boolean().optional(),
      env_uuid: z.string().optional().describe("Env var UUID (for delete)"),
      data: z.record(z.any()).optional().describe("Bulk update data (for update_bulk)"),
    },
    async ({ action, resource, uuid, key, value, is_build_time, env_uuid, data }) => {
      const basePath = `/${resource}/${uuid}/envs`;
      switch (action) {
        case "list":
          return ok(await coolifyFetch(basePath));
        case "create":
          return ok(await coolifyFetch(basePath, {
            method: "POST",
            body: { key, value, is_build_time: is_build_time || false },
          }));
        case "update":
          return ok(await coolifyFetch(basePath, {
            method: "PATCH",
            body: { key, value, is_build_time: is_build_time || false },
          }));
        case "update_bulk":
          return ok(await coolifyFetch(`${basePath}/bulk`, {
            method: "PATCH",
            body: data,
          }));
        case "delete":
          return ok(await coolifyFetch(`${basePath}/${env_uuid}`, {
            method: "DELETE",
          }));
      }
    }
  );
}
