# Valuation Agent Workspace - Development Context

## Project Overview
This is a multi-repo workspace for a financial valuation platform. The workspace contains three separate Git repositories that work together to provide a complete valuation solution.

## Architecture & Key Technologies

### Frontend (Next.js UI)
- **Technology**: Next.js 14 + Tailwind CSS + shadcn/ui
- **Purpose**: User interface for the valuation platform
- **Communication**: Talks to backend via HTTP (port 8000)
- **Location**: `frontend/` directory

### Backend (FastAPI + LangGraph Orchestrator)
- **Technology**: FastAPI + LangGraph for multi-agent orchestration
- **Purpose**: Agent orchestrator, function calling, and guardrails
- **Communication**: Calls API service (port 9000) and manages database
- **Location**: `backend/` directory

### API (Deterministic Valuation Service)
- **Technology**: FastAPI thin façade
- **Purpose**: Deterministic valuation, curves, market data, and exports
- **Future**: Will integrate with QuantLib or Strata services
- **Location**: `api/` directory

### Database
- **Technology**: PostgreSQL
- **Purpose**: Stores runs, lineage, and audit logs
- **Future**: Could migrate to DuckDB+Parquet for data lake

## Directory Structure
```
Valuation Agent Workspace/      # NOT a Git repo - workspace container
├── frontend/                   # Git repo #1 (Next.js UI)
├── backend/                    # Git repo #2 (FastAPI + LangGraph)
├── api/                        # Git repo #3 (Deterministic valuation)
├── docker-compose.yml          # Orchestrates all services
├── Valuation-Agent-Workspace.code-workspace  # Multi-root workspace
└── README.md                   # Workspace documentation
```

## Development Guidelines

### Multi-Root Workspace
- Always open `Valuation-Agent-Workspace.code-workspace` in Cursor
- Use explicit path prefixes (`/frontend/`, `/backend/`, `/api/`) in prompts
- Keep context focused on specific repos to avoid confusion

### Service Communication
- **Frontend → Backend**: HTTP calls to port 8000
- **Backend → API**: HTTP calls to port 9000
- **API → Database**: Direct PostgreSQL connection
- **No direct Frontend → API**: All communication goes through Backend

### Development Workflow
1. Use `docker compose up --build` from parent directory
2. Each service has placeholder containers with `/healthz` endpoints
3. Replace placeholder implementations with real business logic
4. Maintain strict separation of concerns between services

## Environment Configuration
- **Frontend**: `NEXT_PUBLIC_BACKEND_BASE=http://localhost:8000`
- **Backend**: `PORT=8000`, `API_BASE_URL=http://api:9000`, `DATABASE_URL=postgresql://valuation:valuation@db:5432/valuation`
- **API**: `PORT=9000`
- **Database**: PostgreSQL on port 5432

## Error Handling Approach
- Each service implements health check endpoints
- Use structured logging across all services
- Implement proper error boundaries in frontend
- Maintain audit trails for all valuation operations

## Security Considerations
- No direct database access from frontend
- All sensitive operations go through backend
- Implement proper authentication/authorization
- Maintain data lineage and audit logs

## Testing Requirements
- Unit tests for each service
- Integration tests for service communication
- End-to-end tests for complete valuation workflows
- Health check validation for all services

## Global Instructions for Development

### When Working in This Workspace:
1. **Always reference the specific repo** you're working in (`/frontend/`, `/backend/`, `/api/`)
2. **Maintain service boundaries** - don't mix concerns between repos
3. **Use explicit file paths** in all prompts and responses
4. **Follow the communication flow**: Frontend → Backend → API → Database
5. **Keep placeholder implementations** until real business logic is ready
6. **Update this ai.md file** when adding new global patterns or conventions

### Current Status:
- **Scaffolding Phase**: All repos have placeholder implementations
- **Next Phase**: Implement real business logic while maintaining service boundaries
- **Focus**: Keep implementation out until workspace is properly scaffolded

### Key Constraints:
- Parent directory is NOT a Git repo
- Each service repo is independent
- Use multi-root workspace for development
- Maintain strict separation between UI, orchestration, and deterministic logic

