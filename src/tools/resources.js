import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerResourceTools(server) {
  server.tool(
    "resources",
    "List all resources across all projects and environments",
    {
      action: z.enum(["list"]),
    },
    async ({ action }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/resources"));
      }
    }
  );
}
