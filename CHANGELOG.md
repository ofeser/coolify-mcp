# Changelog

## 1.0.0 (2025-01-30)

### Added

- Full Coolify API coverage with 14 tools and 85+ actions
- **servers** — list, get, create, update, delete, validate, resources, domains
- **applications** — list, get, create (6 source types: public, GitHub App, deploy key, Dockerfile, Docker image, Docker Compose), update, delete, logs, start, stop, restart
- **databases** — list, get, create (8 DB types: PostgreSQL, MySQL, MariaDB, MongoDB, Redis, ClickHouse, Dragonfly, KeyDB), update, delete, start, stop, restart, backup management
- **services** — list, get, create, update, delete, start, stop, restart
- **projects** — list, get, create, update, delete
- **environments** — list, get, create, delete
- **deployments** — list, get, deploy, cancel, list by application
- **env_vars** — list, create, update, bulk update, delete
- **private_keys** — list, get, create, update, delete
- **teams** — list, get, current team, members
- **system** — version, healthcheck
- **github_apps** — list, get, create, update, delete
- **cloud_tokens** — list, get, create, update, delete, validate
- **resources** — list all resources
- npx support for zero-install usage
- Modular tool architecture with per-resource file organization
