import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerSystemTools(server) {
  server.tool(
    "system",
    "System operations: version, healthcheck",
    {
      action: z.enum(["version", "healthcheck"]),
    },
    async ({ action }) => {
      switch (action) {
        case "version":
          return ok(await coolifyFetch("/version"));
        case "healthcheck":
          return ok(await coolifyFetch("/healthcheck"));
      }
    }
  );
}
