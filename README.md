# STOCK TRACKER
📊 Stock Tracker — A simple portfolio tracker built with Next.js, React, TailwindCSS, ShadCN UI, and PostgreSQL. Create portfolios, log trades, and view cumulative PnL over time with interactive charts.

## Running Locally

To run this project locally, follow these steps:
1. Install dependencies:
   ```bash
   pnpm i
   ```

2. Configure DATABASE_URL environment variable in the .env file (see .env.example for reference)

3. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

4. Run dev mode:
   ```bash
   pnpm dev
   ```

## Running Docker

This project uses Docker Compose to orchestrate multiple services:

### 🏗️ Architecture

The application consists of 4 services:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Trade Panel   │    │    Trade API    │    │   PostgreSQL    │
│   (Frontend)    │──▶│   (Backend)     │──▶│   (Database)    │
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



## Swagger/OpenAPI Documentation

This API uses Swagger/OpenAPI 3.0 for comprehensive documentation of all endpoints.

### Accessing the Documentation

1. **Start the development server:**

   ```bash
   pnpm start:dev
   ```

2. **Open your browser and navigate to:**
   ```
   http://localhost:3001/api
   ```

### Available Endpoints

#### Portfolio Management

- `GET /portfolios` - Get all portfolios
- `POST /portfolios` - Create a new portfolio
- `GET /portfolios/{id}` - Get portfolio by ID
- `PATCH /portfolios/{id}` - Update portfolio
- `DELETE /portfolios/{id}` - Delete portfolio

#### Trade Management

- `GET /portfolios/{portfolioId}/trades` - Get all trades in portfolio
- `POST /portfolios/{portfolioId}/trades` - Create a new trade
- `GET /portfolios/{portfolioId}/trades/recents` - Get recent trades (paginated)
- `GET /portfolios/{portfolioId}/trades/report` - Get profit/loss report
- `GET /portfolios/{portfolioId}/trades/balance` - Get portfolio balance
- `GET /portfolios/{portfolioId}/trades/{tradeId}` - Get trade by ID
- `PATCH /portfolios/{portfolioId}/trades/{tradeId}` - Update trade
- `DELETE /portfolios/{portfolioId}/trades/{tradeId}` - Delete trade
- `DELETE /portfolios/{portfolioId}/trades` - Delete all trades

### Features

✅ **Complete API Documentation**

- All endpoints documented with descriptions
- Request/response schemas defined
- Parameter documentation with examples
- Error response documentation

✅ **Interactive Testing**

- Try out endpoints directly from the documentation
- Real-time request/response examples
- Parameter validation

✅ **Schema Documentation**

- Request DTOs with validation rules
- Response DTOs with example data
- Error response formats

✅ **Authentication Ready**

- Documentation structure ready for auth implementation
- Security scheme placeholders

### Example Usage

#### Create a Portfolio

```bash
curl -X POST http://localhost:3001/portfolios \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Investment Portfolio",
    "initialValue": 10000.00
  }'
```

#### Create a Trade

```bash
curl -X POST http://localhost:3001/portfolios/{portfolioId}/trades \
  -H "Content-Type: application/json" \
  -d '{
    "ticker": "AAPL",
    "entryPrice": 150.25,
    "exitPrice": 165.50,
    "quantity": 10,
    "date": "2024-01-15T10:30:00Z"
  }'
```

#### Get Portfolio Balance

```bash
curl -X GET http://localhost:3001/portfolios/{portfolioId}/trades/balance
```

### Response Format

All API responses follow a consistent format:

```json
{
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

For paginated responses:

```json
{
  "message": "Data fetched successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 25,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Responses

Errors follow a standard format:

```json
{
  "message": "Error description",
  "statusCode": 400,
  "error": "Bad Request"
}
```

### Development Notes

- All endpoints are tagged for better organization
- DTOs include validation decorators
- Response types are properly typed
- Examples provided for all parameters
- Error cases documented with appropriate HTTP status codes
