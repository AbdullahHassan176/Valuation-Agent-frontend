# Deployment Guide

This guide covers deploying the Valuation Agent application using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed
- Git repository cloned
- Environment variables configured

## Quick Start

### Development Environment

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd valuation-agent
   ```

2. **Copy environment file:**
   ```bash
   cp env.example .env
   ```

3. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Production Environment

1. **Configure environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with production values
   ```

2. **Set production API key:**
   ```bash
   export API_KEY=your-production-api-key
   ```

3. **Start production environment:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

4. **Check service status:**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   ```

## Environment Configuration

### Development
- Uses `docker-compose.dev.yml`
- Hot reloading enabled
- Debug mode enabled
- Volume mounts for live code changes

### Production
- Uses `docker-compose.prod.yml`
- Optimized builds
- Resource limits
- Nginx reverse proxy
- SSL/TLS support (configure certificates)

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ENVIRONMENT` | Environment (development/production) | development | No |
| `DEBUG` | Debug mode | true | No |
| `API_KEY` | API authentication key | dev-key-12345 | Yes |
| `VECTOR_DIR` | Vector store directory | ./data/vectors | No |
| `AUDIT_DB_URL` | Audit database URL | sqlite:///./.run/audit.db | No |
| `REDIS_URL` | Redis connection URL | redis://localhost:6379 | No |
| `NEXT_PUBLIC_API_URL` | Frontend API URL | http://localhost:8000 | Yes |

## Service Architecture

### Backend Service
- **Port:** 8000
- **Health Check:** `/health`
- **Dependencies:** Redis
- **Volumes:** Data persistence

### Frontend Service
- **Port:** 3000
- **Health Check:** Root endpoint
- **Dependencies:** Backend
- **Build:** Next.js production build

### Redis Service
- **Port:** 6379
- **Purpose:** Caching and session storage
- **Persistence:** Volume mounted

### Nginx Service (Production)
- **Ports:** 80, 443
- **Purpose:** Reverse proxy and load balancing
- **Features:** Rate limiting, SSL termination

## Data Persistence

### Volumes
- `redis_data`: Redis persistence
- `./data`: Application data (vectors, audit logs)
- `./backend/.run`: Development runtime files

### Backup Strategy
```bash
# Backup data directory
tar -czf backup-$(date +%Y%m%d).tar.gz ./data

# Backup Redis data
docker-compose exec redis redis-cli BGSAVE
```

## Monitoring and Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Health Checks
```bash
# Check service health
docker-compose ps

# Manual health checks
curl http://localhost:8000/health
curl http://localhost:3000
```

## Security Considerations

### API Key Management
- Use strong, unique API keys in production
- Rotate keys regularly
- Store keys securely (environment variables, secrets management)

### Network Security
- Configure firewall rules
- Use HTTPS in production
- Implement rate limiting
- Regular security updates

### Data Protection
- Encrypt sensitive data
- Regular backups
- Access controls
- Audit logging

## Scaling

### Horizontal Scaling
```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Scale frontend service
docker-compose up -d --scale frontend=2
```

### Resource Limits
- Configure memory and CPU limits
- Monitor resource usage
- Adjust limits based on load

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check port usage
   netstat -tulpn | grep :8000
   netstat -tulpn | grep :3000
   ```

2. **Permission issues:**
   ```bash
   # Fix data directory permissions
   sudo chown -R $USER:$USER ./data
   ```

3. **Service not starting:**
   ```bash
   # Check logs
   docker-compose logs backend
   docker-compose logs frontend
   ```

4. **Database issues:**
   ```bash
   # Reset database
   rm -rf ./data/audit.db
   docker-compose restart backend
   ```

### Performance Optimization

1. **Enable Redis caching:**
   - Configure Redis for optimal performance
   - Monitor memory usage

2. **Optimize builds:**
   - Use multi-stage Docker builds
   - Minimize image sizes
   - Cache dependencies

3. **Database optimization:**
   - Regular maintenance
   - Index optimization
   - Query performance monitoring

## Maintenance

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up --build -d
```

### Cleanup
```bash
# Remove unused containers and images
docker system prune -a

# Clean up volumes
docker volume prune
```

## Support

For deployment issues:
1. Check logs: `docker-compose logs`
2. Verify configuration: `docker-compose config`
3. Test connectivity: `curl http://localhost:8000/health`
4. Review documentation and troubleshooting guides
