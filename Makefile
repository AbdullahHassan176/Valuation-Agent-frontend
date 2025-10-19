# Valuation Agent Deployment Makefile

.PHONY: help dev prod stop clean logs health backup restore

# Default target
help:
	@echo "Valuation Agent Deployment Commands:"
	@echo ""
	@echo "Development:"
	@echo "  dev          Start development environment"
	@echo "  dev-build    Build development environment"
	@echo "  dev-logs     View development logs"
	@echo ""
	@echo "Production:"
	@echo "  prod         Start production environment"
	@echo "  prod-build   Build production environment"
	@echo "  prod-logs    View production logs"
	@echo ""
	@echo "Management:"
	@echo "  stop         Stop all services"
	@echo "  clean        Clean up containers and images"
	@echo "  logs         View logs for all services"
	@echo "  health       Check service health"
	@echo ""
	@echo "Data Management:"
	@echo "  backup       Backup application data"
	@echo "  restore      Restore from backup"
	@echo ""
	@echo "Utilities:"
	@echo "  setup        Initial setup"
	@echo "  update       Update and restart services"
	@echo "  status       Show service status"

# Development environment
dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

dev-build:
	@echo "Building development environment..."
	docker-compose -f docker-compose.dev.yml up --build -d

dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Production environment
prod:
	@echo "Starting production environment..."
	@if [ -z "$(API_KEY)" ]; then \
		echo "Error: API_KEY environment variable is required for production"; \
		exit 1; \
	fi
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production environment started!"
	@echo "Frontend: http://localhost:3000"
	@echo "Backend: http://localhost:8000"

prod-build:
	@echo "Building production environment..."
	docker-compose -f docker-compose.prod.yml up --build -d

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

# Service management
stop:
	@echo "Stopping all services..."
	docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
	docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
	@echo "All services stopped!"

clean:
	@echo "Cleaning up containers and images..."
	docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans 2>/dev/null || true
	docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans 2>/dev/null || true
	docker system prune -f
	@echo "Cleanup completed!"

logs:
	@echo "Showing logs for all services..."
	docker-compose logs -f

health:
	@echo "Checking service health..."
	@echo "Backend health:"
	@curl -s http://localhost:8000/health || echo "Backend not responding"
	@echo ""
	@echo "Frontend health:"
	@curl -s http://localhost:3000 > /dev/null && echo "Frontend responding" || echo "Frontend not responding"
	@echo ""
	@echo "Service status:"
	docker-compose ps

# Data management
backup:
	@echo "Creating backup..."
	@mkdir -p ./backups
	@tar -czf ./backups/backup-$(shell date +%Y%m%d-%H%M%S).tar.gz ./data
	@echo "Backup created in ./backups/"

restore:
	@echo "Available backups:"
	@ls -la ./backups/ 2>/dev/null || echo "No backups found"
	@echo "To restore, run: tar -xzf ./backups/backup-YYYYMMDD-HHMMSS.tar.gz"

# Setup and maintenance
setup:
	@echo "Setting up Valuation Agent..."
	@if [ ! -f .env ]; then \
		cp env.example .env; \
		echo "Created .env file from template"; \
	fi
	@mkdir -p ./data/vectors ./data/audit ./backups
	@echo "Setup completed!"
	@echo "Edit .env file with your configuration"
	@echo "Run 'make dev' to start development environment"

update:
	@echo "Updating services..."
	git pull origin main
	docker-compose down
	docker-compose up --build -d
	@echo "Update completed!"

status:
	@echo "Service Status:"
	docker-compose ps
	@echo ""
	@echo "Resource Usage:"
	docker stats --no-stream

# Database management
db-init:
	@echo "Initializing database..."
	docker-compose exec backend python -c "from app.audit.models import init_db; init_db()"

db-reset:
	@echo "Resetting database..."
	rm -rf ./data/audit.db
	docker-compose restart backend

# Security
security-check:
	@echo "Running security checks..."
	@echo "Checking for exposed ports..."
	netstat -tulpn | grep -E ':(8000|3000|6379)' || echo "No exposed ports found"
	@echo "Checking API key configuration..."
	@if [ -z "$(API_KEY)" ]; then \
		echo "Warning: API_KEY not set"; \
	else \
		echo "API_KEY is configured"; \
	fi

# Monitoring
monitor:
	@echo "Monitoring services..."
	watch -n 5 'docker-compose ps && echo "" && docker stats --no-stream'

# Development helpers
shell-backend:
	docker-compose exec backend bash

shell-frontend:
	docker-compose exec frontend sh

shell-redis:
	docker-compose exec redis redis-cli

# Testing
test:
	@echo "Running tests..."
	docker-compose exec backend python -m pytest tests/

test-coverage:
	@echo "Running tests with coverage..."
	docker-compose exec backend python -m pytest --cov=app tests/

# Documentation
docs:
	@echo "Generating documentation..."
	docker-compose exec backend python -c "import webbrowser; webbrowser.open('http://localhost:8000/docs')"
	@echo "API documentation available at http://localhost:8000/docs"
