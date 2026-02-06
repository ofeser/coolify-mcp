import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerServiceTools(server) {
  server.tool(
    "services",
    `Manage services: list, get, create, update, delete, start, stop, restart.
NOTE: docker_compose_raw must be base64 encoded. This tool auto-encodes it if plain text is detected.`,
    {
      action: z.enum(["list", "get", "create", "update", "delete", "start", "stop", "restart"]),
      uuid: z.string().optional().describe("Service UUID"),
      data: z.record(z.any()).optional().describe("Create/update data. docker_compose_raw will be auto base64-encoded if needed."),
    },
    async ({ action, uuid, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/services"));
        case "get":
          return ok(await coolifyFetch(`/services/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/services", { method: "POST", body: data }));
        case "update": {
          const body = { ...data };
          if (body.docker_compose_raw && !isBase64(body.docker_compose_raw)) {
            body.docker_compose_raw = Buffer.from(body.docker_compose_raw).toString("base64");
          }
          return ok(await coolifyFetch(`/services/${uuid}`, { method: "PATCH", body }));
        }
        case "delete":
          return ok(await coolifyFetch(`/services/${uuid}`, { method: "DELETE" }));
        case "start":
          return ok(await coolifyFetch(`/services/${uuid}/start`));
        case "stop":
          return ok(await coolifyFetch(`/services/${uuid}/stop`));
        case "restart":
          return ok(await coolifyFetch(`/services/${uuid}/restart`));
      }
    }
  );
}

function isBase64(str) {
  if (!str || str.length < 4) return false;
  try {
    return Buffer.from(str, "base64").toString("base64") === str;
  } catch {
    return false;
  }
}
