import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerServiceTools(server) {
  server.tool(
    "services",
    "Manage services: list, get, create, update, delete, start, stop, restart",
    {
      action: z.enum(["list", "get", "create", "update", "delete", "start", "stop", "restart"]),
      uuid: z.string().optional().describe("Service UUID"),
      data: z.record(z.any()).optional().describe("Create/update data"),
    },
    async ({ action, uuid, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/services"));
        case "get":
          return ok(await coolifyFetch(`/services/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/services", { method: "POST", body: data }));
        case "update":
          return ok(await coolifyFetch(`/services/${uuid}`, { method: "PATCH", body: data }));
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
