import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerTeamTools(server) {
  server.tool(
    "teams",
    "Manage teams: list, get, current, current_members, members",
    {
      action: z.enum(["list", "get", "current", "current_members", "members"]),
      id: z.number().optional().describe("Team ID (for get/members)"),
    },
    async ({ action, id }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/teams"));
        case "get":
          return ok(await coolifyFetch(`/teams/${id}`));
        case "current":
          return ok(await coolifyFetch("/teams/current"));
        case "current_members":
          return ok(await coolifyFetch("/teams/current/members"));
        case "members":
          return ok(await coolifyFetch(`/teams/${id}/members`));
      }
    }
  );
}
