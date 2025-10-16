# Valuation-Agent-frontend

Frontend UI (Next.js) for Valuation Agent Workspace.

## How to run (Phase 0)

### Local Development
```bash
# Install dependencies
npm install

# Set environment variables
cp .env.local.example .env.local

# Run the development server
npm run dev
```

### Docker
```bash
# From parent directory
docker compose up --build
```

### Health Check
- Visit http://localhost:3000/health → Shows backend JSON response
- Visit http://localhost:3000 → Home page with navigation
