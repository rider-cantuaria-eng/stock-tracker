# STOCK TRACKER
📊 Stock Tracker — A simple portfolio tracker built with Next.js, React, TailwindCSS, ShadCN UI, and PostgreSQL. Create portfolios, log trades, and view cumulative PnL over time with interactive charts.

## Running Locally

To run this project locally, follow these steps:
1. Install dependencies:
   ```bash
   pnpm i
   ```

2. Start Docker services:
   ```bash
   pnpm docker:up
   ```

3. Run database migrations:
   ```bash
   pnpm db:migrate
   ```


## Running Docker

This project uses Docker Compose to orchestrate multiple services:

### 🏗️ Architecture

The application consists of 4 services:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Trade Panel   │    │    Trade API    │    │   PostgreSQL    │
│   (Frontend)    │──▶│   (Backend)     │──▶│   (Database)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                               ┌─────────────────┐
                                               │     pgAdmin     │
                                               │   (DB Admin)    │
                                               │   Port: 8080    │
                                               └─────────────────┘
```

### Services
- **PostgreSQL Database** (`postgres`) - Port 5432
- **Trade API** (`trade-api`) - Port 3001 (NestJS backend)
- **Trade Panel** (`trade-panel`) - Port 3000 (Next.js frontend)
- **pgAdmin** (`pgadmin`) - Port 8080 (Database management interface)

### 🐳 Docker Commands

| Command | Description |
|---------|-------------|
| `pnpm docker:up` | Start all services in detached mode |
| `pnpm docker:down` | Stop and remove all containers |
| `pnpm docker:logs` | View logs from all services |
| `pnpm docker:reset` | Reset all data (stop, remove volumes, restart) |


## 📦 Database Scripts (Prisma)
The project includes several convenient npm scripts for database management:

| Script | Command | Description |
|--------|---------|-------------|
| `pnpm db:generate` | `pnpm --filter trade-api exec prisma generate` | Generate Prisma client |
| `pnpm db:migrate` | `pnpm --filter trade-api exec prisma migrate dev` | Run database migrations |
| `pnpm db:studio` | `pnpm --filter trade-api exec prisma studio` | Open Prisma Studio |



