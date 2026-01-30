import { z } from "zod";
import { coolifyFetch } from "../client.js";
import { ok, err } from "../helpers.js";

export function registerDatabaseTools(server) {
  server.tool(
    "databases",
    "Manage databases: list, get, create (8 DB types), update, delete, start, stop, restart, backup management",
    {
      action: z.enum([
        "list", "get", "create", "update", "delete",
        "start", "stop", "restart",
        "list_backups", "create_backup", "update_backup", "delete_backup",
        "list_backup_executions", "delete_backup_execution",
      ]),
      uuid: z.string().optional().describe("Database UUID"),
      db_type: z.enum([
        "postgresql", "mysql", "mariadb", "mongodb",
        "redis", "clickhouse", "dragonfly", "keydb",
      ]).optional().describe("Database type (required for create)"),
      backup_uuid: z.string().optional().describe("Scheduled backup UUID"),
      execution_uuid: z.string().optional().describe("Backup execution UUID"),
      data: z.record(z.any()).optional().describe("Database/backup data (for create/update)"),
    },
    async ({ action, uuid, db_type, backup_uuid, execution_uuid, data }) => {
      switch (action) {
        case "list":
          return ok(await coolifyFetch("/databases"));
        case "get":
          return ok(await coolifyFetch(`/databases/${uuid}`));
        case "create": {
          if (!db_type) return err("db_type is required for create action");
          return ok(await coolifyFetch(`/databases/${db_type}`, { method: "POST", body: data }));
        }
        case "update":
          return ok(await coolifyFetch(`/databases/${uuid}`, { method: "PATCH", body: data }));
        case "delete":
          return ok(await coolifyFetch(`/databases/${uuid}`, { method: "DELETE" }));
        case "start":
          return ok(await coolifyFetch(`/databases/${uuid}/start`));
        case "stop":
          return ok(await coolifyFetch(`/databases/${uuid}/stop`));
        case "restart":
          return ok(await coolifyFetch(`/databases/${uuid}/restart`));
        case "list_backups":
          return ok(await coolifyFetch(`/databases/${uuid}/backups`));
        case "create_backup":
          return ok(await coolifyFetch(`/databases/${uuid}/backups`, { method: "POST", body: data }));
        case "update_backup":
          return ok(await coolifyFetch(`/databases/${uuid}/backups/${backup_uuid}`, { method: "PATCH", body: data }));
        case "delete_backup":
          return ok(await coolifyFetch(`/databases/${uuid}/backups/${backup_uuid}`, { method: "DELETE" }));
        case "list_backup_executions":
          return ok(await coolifyFetch(`/databases/${uuid}/backups/${backup_uuid}/executions`));
        case "delete_backup_execution":
          return ok(await coolifyFetch(`/databases/${uuid}/backups/${backup_uuid}/executions/${execution_uuid}`, { method: "DELETE" }));
      }
    }
  );
}
