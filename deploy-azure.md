# Azure Static Web App Deployment Guide

This guide will help you deploy your Valuation Agent Workspace to Azure Static Web Apps.

## Prerequisites

1. **Azure Account**: You need an active Azure subscription
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Node.js**: Version 18 or later for frontend builds
4. **Python**: Version 3.9 or later for API development

## Step 1: Prepare Your Repository

### 1.1 Fix Frontend Issues
The frontend has been cleaned up to remove duplicate imports. The main issues were:
- Duplicate lucide-react imports in `frontend/app/runs/page.tsx`
- These have been resolved with a clean import structure

### 1.2 Repository Structure
Your repository should have this structure:
```
Valuation-Agent-Workspace/
├── frontend/                 # Next.js frontend
├── api/                     # FastAPI backend
├── .github/workflows/       # GitHub Actions
├── staticwebapp.config.json # Azure configuration
└── README.md
```

## Step 2: Create Azure Static Web App

### 2.1 Using Azure Portal

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create Resource**: Click "Create a resource"
3. **Search for "Static Web Apps"**: Select "Static Web Apps"
4. **Click "Create"**

### 2.2 Configure the Static Web App

Fill in the following details:

- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing
- **Name**: `valuation-agent-app` (or your preferred name)
- **Plan Type**: Free (for development) or Standard (for production)
- **Region**: Choose closest to your users
- **Source**: GitHub
- **GitHub Account**: Sign in and authorize
- **Organization**: Select your GitHub organization
- **Repository**: Select your repository
- **Branch**: `main`

### 2.3 Build Configuration

Configure the build settings:

- **Build Presets**: Custom
- **App Location**: `/frontend`
- **API Location**: `/api`
- **Output Location**: `out`

## Step 3: Configure GitHub Secrets

### 3.1 Get Deployment Token

1. In Azure Portal, go to your Static Web App
2. Go to "Overview" → "Manage deployment token"
3. Copy the deployment token

### 3.2 Add GitHub Secret

1. Go to your GitHub repository
2. Go to "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the deployment token from Azure

## Step 4: Deploy

### 4.1 Automatic Deployment

Once configured, the GitHub Action will automatically deploy when you push to the `main` branch:

1. **Push to main**: `git push origin main`
2. **Check GitHub Actions**: Go to your repo → "Actions" tab
3. **Monitor deployment**: Watch the workflow run

### 4.2 Manual Deployment

You can also trigger deployment manually:

1. Go to GitHub Actions
2. Select "Azure Static Web Apps CI/CD"
3. Click "Run workflow"

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Custom Domain

1. In Azure Portal, go to your Static Web App
2. Go to "Custom domains"
3. Click "Add"
4. Enter your domain name
5. Follow the DNS configuration instructions

### 5.2 SSL Certificate

Azure automatically provides SSL certificates for custom domains.

## Step 6: Environment Configuration

### 6.1 Frontend Environment Variables

Create `frontend/.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Valuation Agent
```

### 6.2 API Environment Variables

Create `api/.env` for local development:

```env
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
```

## Step 7: Testing Your Deployment

### 7.1 Check Frontend

1. Go to your Static Web App URL (provided in Azure Portal)
2. Verify the frontend loads correctly
3. Test navigation between pages

### 7.2 Check API

1. Test API endpoints: `https://your-app.azurestaticapps.net/api/healthz`
2. Verify CORS is working
3. Test the runs endpoints

### 7.3 Test Full Integration

1. Create a new valuation run
2. Verify the API processes the request
3. Check that results are displayed

## Step 8: Production Considerations

### 8.1 Security

- **HTTPS**: Automatically enabled
- **Security Headers**: Configured in `staticwebapp.config.json`
- **CORS**: Configured for your domain

### 8.2 Performance

- **CDN**: Automatically provided by Azure
- **Caching**: Configured for optimal performance
- **Compression**: Enabled by default

### 8.3 Monitoring

- **Application Insights**: Can be enabled for monitoring
- **Logs**: Available in Azure Portal
- **Metrics**: Performance and usage metrics

## Troubleshooting

### Common Issues

1. **Build Failures**: Check GitHub Actions logs
2. **API Not Working**: Verify `startup.py` configuration
3. **Frontend Not Loading**: Check Next.js build output
4. **CORS Issues**: Verify API CORS configuration

### Debug Steps

1. **Check GitHub Actions**: Look for build errors
2. **Check Azure Logs**: Go to Static Web App → "Logs"
3. **Test Locally**: Run `npm run build` in frontend
4. **Test API**: Run `python startup.py` in api

## Cost Optimization

### Free Tier Limits

- **Storage**: 100 MB
- **Bandwidth**: 100 GB/month
- **Build Minutes**: 100 minutes/month

### Upgrade to Standard

For production use, consider upgrading to Standard tier:
- **Storage**: 500 GB
- **Bandwidth**: 1 TB/month
- **Build Minutes**: 1,000 minutes/month
- **Custom Domains**: Unlimited
- **Staging Environments**: Available

## Next Steps

1. **Set up monitoring**: Enable Application Insights
2. **Configure backups**: Set up automated backups
3. **Set up staging**: Create staging environment
4. **Performance tuning**: Optimize for production load

## Support

- **Azure Documentation**: https://docs.microsoft.com/en-us/azure/static-web-apps/
- **GitHub Actions**: https://docs.github.com/en/actions
- **Next.js Deployment**: https://nextjs.org/docs/deployment

Your Valuation Agent Workspace is now ready for production deployment on Azure Static Web Apps! 🚀
