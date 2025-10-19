#!/bin/bash

# Valuation Agent Deployment Script
# Usage: ./scripts/deploy.sh [environment] [action]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="development"
ACTION="start"
COMPOSE_FILE=""

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    echo "Valuation Agent Deployment Script"
    echo ""
    echo "Usage: $0 [environment] [action]"
    echo ""
    echo "Environments:"
    echo "  dev, development    Development environment"
    echo "  prod, production     Production environment"
    echo ""
    echo "Actions:"
    echo "  start                Start services"
    echo "  stop                 Stop services"
    echo "  restart              Restart services"
    echo "  build                Build and start services"
    echo "  logs                 View logs"
    echo "  health               Check service health"
    echo "  clean                Clean up containers and images"
    echo "  backup               Backup application data"
    echo "  restore              Restore from backup"
    echo ""
    echo "Examples:"
    echo "  $0 dev start         Start development environment"
    echo "  $0 prod build        Build and start production environment"
    echo "  $0 dev logs          View development logs"
}

check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Check if Docker Compose is installed
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    # Check if .env file exists
    if [ ! -f .env ]; then
        log_warning ".env file not found. Creating from template..."
        cp env.example .env
        log_warning "Please edit .env file with your configuration"
    fi
    
    log_success "Prerequisites check completed"
}

setup_environment() {
    log_info "Setting up environment: $ENVIRONMENT"
    
    case $ENVIRONMENT in
        "dev"|"development")
            COMPOSE_FILE="docker-compose.dev.yml"
            ;;
        "prod"|"production")
            COMPOSE_FILE="docker-compose.prod.yml"
            # Check for production API key
            if [ -z "$API_KEY" ]; then
                log_error "API_KEY environment variable is required for production deployment"
                exit 1
            fi
            ;;
        *)
            log_error "Invalid environment: $ENVIRONMENT"
            show_help
            exit 1
            ;;
    esac
    
    log_success "Environment setup completed"
}

start_services() {
    log_info "Starting services..."
    docker-compose -f $COMPOSE_FILE up -d
    log_success "Services started"
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 10
    
    # Check health
    check_health
}

stop_services() {
    log_info "Stopping services..."
    docker-compose -f $COMPOSE_FILE down
    log_success "Services stopped"
}

restart_services() {
    log_info "Restarting services..."
    stop_services
    start_services
}

build_services() {
    log_info "Building and starting services..."
    docker-compose -f $COMPOSE_FILE up --build -d
    log_success "Services built and started"
    
    # Wait for services to be ready
    log_info "Waiting for services to be ready..."
    sleep 15
    
    # Check health
    check_health
}

show_logs() {
    log_info "Showing logs..."
    docker-compose -f $COMPOSE_FILE logs -f
}

check_health() {
    log_info "Checking service health..."
    
    # Check backend
    if curl -s http://localhost:8000/health > /dev/null; then
        log_success "Backend is healthy"
    else
        log_warning "Backend is not responding"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null; then
        log_success "Frontend is healthy"
    else
        log_warning "Frontend is not responding"
    fi
    
    # Show service status
    log_info "Service status:"
    docker-compose -f $COMPOSE_FILE ps
}

clean_up() {
    log_info "Cleaning up containers and images..."
    docker-compose -f $COMPOSE_FILE down --volumes --remove-orphans
    docker system prune -f
    log_success "Cleanup completed"
}

backup_data() {
    log_info "Creating backup..."
    mkdir -p ./backups
    timestamp=$(date +%Y%m%d-%H%M%S)
    tar -czf "./backups/backup-$timestamp.tar.gz" ./data
    log_success "Backup created: ./backups/backup-$timestamp.tar.gz"
}

restore_data() {
    log_info "Available backups:"
    ls -la ./backups/ 2>/dev/null || log_warning "No backups found"
    echo ""
    log_info "To restore, run: tar -xzf ./backups/backup-YYYYMMDD-HHMMSS.tar.gz"
}

# Main script
main() {
    # Parse arguments
    if [ $# -eq 0 ]; then
        show_help
        exit 1
    fi
    
    ENVIRONMENT=$1
    ACTION=${2:-start}
    
    # Check prerequisites
    check_prerequisites
    
    # Setup environment
    setup_environment
    
    # Execute action
    case $ACTION in
        "start")
            start_services
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            restart_services
            ;;
        "build")
            build_services
            ;;
        "logs")
            show_logs
            ;;
        "health")
            check_health
            ;;
        "clean")
            clean_up
            ;;
        "backup")
            backup_data
            ;;
        "restore")
            restore_data
            ;;
        *)
            log_error "Invalid action: $ACTION"
            show_help
            exit 1
            ;;
    esac
    
    log_success "Deployment script completed"
}

# Run main function with all arguments
main "$@"
