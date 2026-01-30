import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerCloudTokenTools(server) {
  server.tool(
    "cloud_tokens",
    "Manage cloud provider tokens: list, get, create, update, delete, validate",
    {
      action: z.enum(["list", "get", "create", "update", "delete", "validate"]),
      uuid: z.string().optional().describe("Cloud token UUID"),
      data: z.record(z.any()).optional().describe("Token data (for create/update)"),
    },
    async ({ action, uuid, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/cloud-tokens"));
        case "get":
          return ok(await coolifyFetch(`/cloud-tokens/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/cloud-tokens", { method: "POST", body: data }));
        case "update":
          return ok(await coolifyFetch(`/cloud-tokens/${uuid}`, { method: "PATCH", body: data }));
        case "delete":
          return ok(await coolifyFetch(`/cloud-tokens/${uuid}`, { method: "DELETE" }));
        case "validate":
          return ok(await coolifyFetch(`/cloud-tokens/${uuid}/validate`, { method: "POST" }));
      }
    }
  );
}
