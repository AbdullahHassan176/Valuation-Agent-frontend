# Manual API Testing Guide

## Test Backend Health
```bash
# Local testing
curl http://localhost:9000/healthz

# Production testing  
curl https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net/healthz
```

## Test API Runs Endpoint
```bash
# Get all runs
curl http://localhost:9000/api/valuation/runs

# Get specific run (replace {run_id} with actual ID)
curl http://localhost:9000/api/valuation/runs/{run_id}
```

## Test Create Run
```bash
curl -X POST http://localhost:9000/api/valuation/runs \
  -H "Content-Type: application/json" \
  -d '{
    "spec": {
      "notional": 1000000,
      "ccy": "USD",
      "payFixed": true,
      "fixedRate": 0.05,
      "floatIndex": "SOFR",
      "effective": "2024-01-15",
      "maturity": "2029-01-15",
      "dcFixed": "ACT/360",
      "dcFloat": "ACT/360",
      "freqFixed": "Q",
      "freqFloat": "Q",
      "calendar": "USD",
      "bdc": "MODIFIED_FOLLOWING"
    },
    "asOf": "2024-01-15",
    "marketDataProfile": "default",
    "approach": ["OIS_discounting"]
  }'
```

## Expected Responses

### Health Check (200 OK)
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Create Run (201 Created)
```json
{
  "id": "run-uuid-here",
  "status": "queued",
  "created_at": "2024-01-15T10:30:00Z",
  "request": { ... }
}
```

### Get Runs (200 OK)
```json
[
  {
    "id": "run-uuid-here",
    "status": "completed",
    "created_at": "2024-01-15T10:30:00Z",
    "result": { ... }
  }
]
```

