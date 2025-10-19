@echo off
REM Valuation Agent Deployment Script for Windows
REM Usage: scripts\deploy.bat [environment] [action]

setlocal enabledelayedexpansion

REM Default values
set ENVIRONMENT=development
set ACTION=start
set COMPOSE_FILE=

REM Parse arguments
if "%1"=="" (
    call :show_help
    exit /b 1
)
set ENVIRONMENT=%1
if "%2"=="" (
    set ACTION=start
) else (
    set ACTION=%2
)

REM Check prerequisites
call :check_prerequisites
if errorlevel 1 exit /b 1

REM Setup environment
call :setup_environment
if errorlevel 1 exit /b 1

REM Execute action
if "%ACTION%"=="start" call :start_services
if "%ACTION%"=="stop" call :stop_services
if "%ACTION%"=="restart" call :restart_services
if "%ACTION%"=="build" call :build_services
if "%ACTION%"=="logs" call :show_logs
if "%ACTION%"=="health" call :check_health
if "%ACTION%"=="clean" call :clean_up
if "%ACTION%"=="backup" call :backup_data
if "%ACTION%"=="restore" call :restore_data

echo [SUCCESS] Deployment script completed
exit /b 0

:show_help
echo Valuation Agent Deployment Script
echo.
echo Usage: %0 [environment] [action]
echo.
echo Environments:
echo   dev, development    Development environment
echo   prod, production     Production environment
echo.
echo Actions:
echo   start                Start services
echo   stop                 Stop services
echo   restart              Restart services
echo   build                Build and start services
echo   logs                 View logs
echo   health               Check service health
echo   clean                Clean up containers and images
echo   backup               Backup application data
echo   restore              Restore from backup
echo.
echo Examples:
echo   %0 dev start         Start development environment
echo   %0 prod build        Build and start production environment
echo   %0 dev logs          View development logs
exit /b 0

:check_prerequisites
echo [INFO] Checking prerequisites...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Check if .env file exists
if not exist .env (
    echo [WARNING] .env file not found. Creating from template...
    copy env.example .env
    echo [WARNING] Please edit .env file with your configuration
)

echo [SUCCESS] Prerequisites check completed
exit /b 0

:setup_environment
echo [INFO] Setting up environment: %ENVIRONMENT%

if "%ENVIRONMENT%"=="dev" set COMPOSE_FILE=docker-compose.dev.yml
if "%ENVIRONMENT%"=="development" set COMPOSE_FILE=docker-compose.dev.yml
if "%ENVIRONMENT%"=="prod" set COMPOSE_FILE=docker-compose.prod.yml
if "%ENVIRONMENT%"=="production" set COMPOSE_FILE=docker-compose.prod.yml

if "%COMPOSE_FILE%"=="" (
    echo [ERROR] Invalid environment: %ENVIRONMENT%
    call :show_help
    exit /b 1
)

if "%ENVIRONMENT%"=="prod" if "%API_KEY%"=="" (
    echo [ERROR] API_KEY environment variable is required for production deployment
    exit /b 1
)

echo [SUCCESS] Environment setup completed
exit /b 0

:start_services
echo [INFO] Starting services...
docker-compose -f %COMPOSE_FILE% up -d
echo [SUCCESS] Services started

echo [INFO] Waiting for services to be ready...
timeout /t 10 /nobreak >nul

call :check_health
exit /b 0

:stop_services
echo [INFO] Stopping services...
docker-compose -f %COMPOSE_FILE% down
echo [SUCCESS] Services stopped
exit /b 0

:restart_services
echo [INFO] Restarting services...
call :stop_services
call :start_services
exit /b 0

:build_services
echo [INFO] Building and starting services...
docker-compose -f %COMPOSE_FILE% up --build -d
echo [SUCCESS] Services built and started

echo [INFO] Waiting for services to be ready...
timeout /t 15 /nobreak >nul

call :check_health
exit /b 0

:show_logs
echo [INFO] Showing logs...
docker-compose -f %COMPOSE_FILE% logs -f
exit /b 0

:check_health
echo [INFO] Checking service health...

REM Check backend
curl -s http://localhost:8000/health >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Backend is not responding
) else (
    echo [SUCCESS] Backend is healthy
)

REM Check frontend
curl -s http://localhost:3000 >nul 2>&1
if errorlevel 1 (
    echo [WARNING] Frontend is not responding
) else (
    echo [SUCCESS] Frontend is healthy
)

echo [INFO] Service status:
docker-compose -f %COMPOSE_FILE% ps
exit /b 0

:clean_up
echo [INFO] Cleaning up containers and images...
docker-compose -f %COMPOSE_FILE% down --volumes --remove-orphans
docker system prune -f
echo [SUCCESS] Cleanup completed
exit /b 0

:backup_data
echo [INFO] Creating backup...
if not exist backups mkdir backups
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "YYYY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "timestamp=%YYYY%%MM%%DD%-%HH%%Min%%Sec%"
tar -czf "backups\backup-%timestamp%.tar.gz" data
echo [SUCCESS] Backup created: backups\backup-%timestamp%.tar.gz
exit /b 0

:restore_data
echo [INFO] Available backups:
dir backups\ 2>nul || echo [WARNING] No backups found
echo.
echo [INFO] To restore, run: tar -xzf backups\backup-YYYYMMDD-HHMMSS.tar.gz
exit /b 0
