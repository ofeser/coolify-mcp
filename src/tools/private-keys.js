import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerPrivateKeyTools(server) {
  server.tool(
    "private_keys",
    "Manage SSH keys: list, get, create, update, delete",
    {
      action: z.enum(["list", "get", "create", "update", "delete"]),
      uuid: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      private_key: z.string().optional(),
    },
    async ({ action, uuid, name, description, private_key }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/security/keys"));
        case "get":
          return ok(await coolifyFetch(`/security/keys/${uuid}`));
        case "create":
          return ok(await coolifyFetch("/security/keys", {
            method: "POST",
            body: { name, description, private_key },
          }));
        case "update":
          return ok(await coolifyFetch(`/security/keys/${uuid}`, {
            method: "PATCH",
            body: { name, description, private_key },
          }));
        case "delete":
          return ok(await coolifyFetch(`/security/keys/${uuid}`, { method: "DELETE" }));
      }
    }
  );
}
