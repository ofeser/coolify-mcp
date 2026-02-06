import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerEnvVarTools(server) {
  server.tool(
    "env_vars",
    `Manage environment variables for applications or services: list, create, update, update_bulk, delete.
KNOWN ISSUE: Service env var create may return 500 due to Coolify API bug. Workaround: update docker_compose_raw via services update instead.
NOTE: is_build_time is only supported for applications, not services.`,
    {
      action: z.enum(["list", "create", "update", "update_bulk", "delete"]),
      resource: z.enum(["applications", "services"]).describe("Resource type"),
      uuid: z.string().describe("Resource UUID"),
      key: z.string().optional(),
      value: z.string().optional(),
      is_build_time: z.boolean().optional().describe("Only for applications. NOT supported for services — sending it causes errors."),
      is_preview: z.boolean().optional().describe("Whether this env var is for preview deployments"),
      is_literal: z.boolean().optional(),
      is_multiline: z.boolean().optional(),
      is_shown_once: z.boolean().optional(),
      env_uuid: z.string().optional().describe("Env var UUID (for delete)"),
      data: z.record(z.any()).optional().describe("Bulk update data. Format: { data: [{ key, value, is_preview, is_literal, is_multiline, is_shown_once }] }"),
    },
    async ({ action, resource, uuid, key, value, is_build_time, is_preview, is_literal, is_multiline, is_shown_once, env_uuid, data }) => {
      const basePath = `/${resource}/${uuid}/envs`;
      switch (action) {
        case "list":
          return ok(await coolifyFetch(basePath));
        case "create": {
          const body = { key, value };
          if (resource === "applications" && is_build_time !== undefined) body.is_build_time = is_build_time;
          if (is_preview !== undefined) body.is_preview = is_preview;
          if (is_literal !== undefined) body.is_literal = is_literal;
          if (is_multiline !== undefined) body.is_multiline = is_multiline;
          if (is_shown_once !== undefined) body.is_shown_once = is_shown_once;
          return ok(await coolifyFetch(basePath, { method: "POST", body }));
        }
        case "update": {
          const body = { key, value };
          if (resource === "applications" && is_build_time !== undefined) body.is_build_time = is_build_time;
          if (is_preview !== undefined) body.is_preview = is_preview;
          if (is_literal !== undefined) body.is_literal = is_literal;
          if (is_multiline !== undefined) body.is_multiline = is_multiline;
          if (is_shown_once !== undefined) body.is_shown_once = is_shown_once;
          return ok(await coolifyFetch(basePath, { method: "PATCH", body }));
        }
        case "update_bulk": {
          if (!data) return err("data is required for update_bulk. Format: { data: [{ key, value, is_preview, is_literal, is_multiline, is_shown_once }] }");
          const body = Array.isArray(data?.data) ? data : { data: Array.isArray(data) ? data : [] };
          return ok(await coolifyFetch(`${basePath}/bulk`, { method: "PATCH", body }));
        }
        case "delete":
          return ok(await coolifyFetch(`${basePath}/${env_uuid}`, {
            method: "DELETE",
          }));
      }
    }
  );
}
