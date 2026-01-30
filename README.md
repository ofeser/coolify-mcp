# coolify-mcp

[![npm version](https://img.shields.io/npm/v/coolify-mcp.svg)](https://www.npmjs.com/package/coolify-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

MCP (Model Context Protocol) server for the [Coolify](https://coolify.io) API. Manage your self-hosted infrastructure — servers, applications, databases, services, and deployments — through AI assistants like Claude.

## Quick Start

### Using npx (recommended)

No installation needed. Configure your MCP client:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "npx",
      "args": ["-y", "coolify-mcp"],
      "env": {
        "COOLIFY_API_URL": "https://your-coolify-instance.com",
        "COOLIFY_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Global install

```bash
npm install -g coolify-mcp
```

Then use `coolify-mcp` as the command in your MCP client configuration.

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `COOLIFY_API_URL` | Yes | Your Coolify instance URL (e.g. `https://coolify.example.com`) |
| `COOLIFY_API_TOKEN` | Yes | API token from Coolify Settings > API |

### Getting Your API Token

1. Go to your Coolify dashboard
2. Navigate to **Settings** > **API**
3. Generate a new token
4. Copy the token and set it as `COOLIFY_API_TOKEN`

## Client Setup

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "coolify": {
      "command": "npx",
      "args": ["-y", "coolify-mcp"],
      "env": {
        "COOLIFY_API_URL": "https://your-coolify-instance.com",
        "COOLIFY_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Claude Code

```bash
claude mcp add coolify -- npx -y coolify-mcp
```

Then set the environment variables in your shell or `.env` file.

### Cursor

Add to `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "npx",
      "args": ["-y", "coolify-mcp"],
      "env": {
        "COOLIFY_API_URL": "https://your-coolify-instance.com",
        "COOLIFY_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

## Available Tools

### servers

Manage servers: list, get, create, update, delete, validate, resources, domains.

| Action | Description |
|--------|-------------|
| `list` | List all servers |
| `get` | Get server details by UUID |
| `create` | Create a new server |
| `update` | Update server configuration |
| `delete` | Delete a server |
| `validate` | Validate server connectivity |
| `resources` | List resources deployed on a server |
| `domains` | Get domain-to-IP mappings |

### applications

Manage applications: list, get, create (6 source types), update, delete, logs, start, stop, restart.

| Action | Description |
|--------|-------------|
| `list` | List all applications |
| `get` | Get application details by UUID |
| `create` | Create application (requires `source_type`) |
| `update` | Update application configuration |
| `delete` | Delete an application |
| `logs` | Get application logs |
| `start` | Start an application |
| `stop` | Stop an application |
| `restart` | Restart an application |

**Source types for create:** `public`, `private-github-app`, `private-deploy-key`, `dockerfile`, `dockerimage`, `dockercompose`

### databases

Manage databases: list, get, create (8 DB types), update, delete, start, stop, restart, backup management.

| Action | Description |
|--------|-------------|
| `list` | List all databases |
| `get` | Get database details by UUID |
| `create` | Create database (requires `db_type`) |
| `update` | Update database configuration |
| `delete` | Delete a database |
| `start` | Start a database |
| `stop` | Stop a database |
| `restart` | Restart a database |
| `list_backups` | List scheduled backups |
| `create_backup` | Create a backup schedule |
| `update_backup` | Update a backup schedule |
| `delete_backup` | Delete a backup schedule |
| `list_backup_executions` | List backup executions |
| `delete_backup_execution` | Delete a backup execution |

**Database types:** `postgresql`, `mysql`, `mariadb`, `mongodb`, `redis`, `clickhouse`, `dragonfly`, `keydb`

### services

Manage services: list, get, create, update, delete, start, stop, restart.

### projects

Manage projects: list, get, create, update, delete.

### environments

Manage project environments: list, get, create, delete.

### deployments

Manage deployments: list, get, deploy, cancel, list_by_app.

### env_vars

Manage environment variables for applications or services: list, create, update, update_bulk, delete.

### private_keys

Manage SSH keys: list, get, create, update, delete.

### teams

Manage teams: list, get, current, current_members, members.

### system

System operations: version, healthcheck.

### github_apps

Manage GitHub Apps: list, get, create, update, delete.

### cloud_tokens

Manage cloud provider tokens: list, get, create, update, delete, validate.

### resources

List all resources across all projects and environments.

## API Coverage

| Category | Actions | Status |
|----------|---------|--------|
| Servers | list, get, create, update, delete, validate, resources, domains | Full |
| Applications | list, get, create (6 types), update, delete, logs, start, stop, restart | Full |
| Databases | list, get, create (8 types), update, delete, start, stop, restart, backups | Full |
| Services | list, get, create, update, delete, start, stop, restart | Full |
| Projects | list, get, create, update, delete | Full |
| Environments | list, get, create, delete | Full |
| Deployments | list, get, deploy, cancel, list by app | Full |
| Environment Variables | list, create, update, bulk update, delete | Full |
| SSH Keys | list, get, create, update, delete | Full |
| Teams | list, get, current, members | Full |
| System | version, healthcheck | Full |
| GitHub Apps | list, get, create, update, delete | Full |
| Cloud Tokens | list, get, create, update, delete, validate | Full |
| Resources | list | Full |

**14 tools, 85+ actions, ~100% Coolify API coverage**

## Roadmap

- [ ] Hetzner cloud server provisioning
- [ ] Detailed Zod schemas per resource type for better AI guidance
- [ ] MCP Resources (expose server/app status as readable resources)
- [ ] MCP Prompts (pre-built prompts for common workflows)
- [ ] Response optimization for large payloads

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-tool`)
3. Commit your changes (`git commit -m 'Add new tool'`)
4. Push to the branch (`git push origin feature/new-tool`)
5. Open a Pull Request

## License

[MIT](LICENSE)
