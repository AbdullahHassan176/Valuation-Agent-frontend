# Complete Azure Static Web Apps Deployment Guide

This guide will help you deploy your frontend to Azure Static Web Apps with GitHub Actions.

## Prerequisites

- Azure account with active subscription
- GitHub repository with your frontend code
- Node.js and npm installed locally

## Step 1: Prepare Your Repository

### 1.1 Verify File Structure
Your repository should have this structure:
```
your-frontend-repo/
├── app/                     # Next.js app directory
├── components/              # React components
├── public/                  # Static assets
├── styles/                 # CSS files
├── package.json            # Node.js dependencies
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── .github/workflows/      # GitHub Actions
└── staticwebapp.config.json # Azure configuration
```

### 1.2 Verify Next.js Configuration
Your `next.config.js` should look like this:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig
```

### 1.3 Test Local Build
```bash
npm run build
```
This should create an `out` folder with your static files.

## Step 2: Create Azure Static Web App

### 2.1 Azure Portal Setup
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web Apps"
4. Click "Create"

### 2.2 Configure Static Web App
Fill in these details:

**Basics:**
- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing
- **Name**: `your-frontend-app` (or your preferred name)
- **Plan Type**: Free (for development) or Standard (for production)
- **Region**: Choose closest to your users

**Source:**
- **Source**: GitHub
- **GitHub Account**: Sign in and authorize
- **Organization**: Select your GitHub organization
- **Repository**: Select your frontend repository
- **Branch**: `main`

**Build Details:**
- **Build Presets**: Custom
- **App Location**: `/` (root of repository)
- **API Location**: (leave empty - no API)
- **Output Location**: `out`

### 2.3 Review and Create
- Review your configuration
- Click "Review + Create"
- Click "Create"

## Step 3: Configure GitHub Actions

### 3.1 Get Deployment Token
1. Go to your Static Web App in Azure Portal
2. Go to "Overview" → "Manage deployment token"
3. Copy the deployment token

### 3.2 Add GitHub Secret
1. Go to your GitHub repository
2. Go to "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the deployment token from step 3.1
6. Click "Add secret"

### 3.3 Verify GitHub Actions Workflow
The workflow file should be at `.github/workflows/azure-static-web-apps.yml`:

```yaml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - main

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "out"
          skip_app_build: false

  close_pull_request_job:
    if: github.event_name == 'pull_request' && github.event.action == 'closed'
    runs-on: ubuntu-latest
    name: Close Pull Request Job
    steps:
      - name: Close Pull Request
        id: closepullrequest
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          action: "close"
```

## Step 4: Deploy

### 4.1 Push to GitHub
```bash
git add .
git commit -m "Configure for Azure Static Web Apps deployment"
git push origin main
```

### 4.2 Monitor Deployment
1. Go to GitHub Actions tab in your repository
2. Watch the "Azure Static Web Apps CI/CD" workflow
3. Check for any build errors

### 4.3 Get Your URL
1. Go to your Static Web App in Azure Portal
2. Go to "Overview"
3. Copy the "URL" - this is your deployed app URL

## Step 5: Test Your Deployment

### 5.1 Check Frontend
1. Visit your Static Web App URL
2. Verify the frontend loads correctly
3. Test navigation between pages
4. Check that all icons load properly

### 5.2 Common Issues and Solutions

#### **Build Failures**
- **Error**: "Module not found" or import errors
- **Solution**: Check all imports are correct, no duplicate imports
- **Error**: "TypeScript errors"
- **Solution**: Run `npm run build` locally to fix TypeScript issues

#### **Routing Issues**
- **Error**: 404 errors on page refresh
- **Solution**: Check `staticwebapp.config.json` configuration
- **Error**: Images not loading
- **Solution**: Verify image paths and Next.js image configuration

#### **Performance Issues**
- **Error**: Slow loading
- **Solution**: Check bundle size, optimize images, enable CDN

## Step 6: Production Optimizations

### 6.1 Custom Domain
1. Go to "Custom domains" in your Static Web App
2. Add your domain name
3. Follow DNS configuration instructions

### 6.2 Environment Variables
1. Go to "Configuration" → "Application settings"
2. Add any required environment variables

### 6.3 Monitoring
1. Enable Application Insights
2. Set up alerts for errors
3. Monitor performance metrics

## Step 7: Troubleshooting

### 7.1 Common Build Errors

#### **Duplicate Imports**
```bash
# Check for duplicate imports
grep -n "import.*from.*lucide-react" app/runs/page.tsx
```

#### **TypeScript Errors**
```bash
# Run TypeScript check
npx tsc --noEmit
```

#### **Next.js Build Errors**
```bash
# Test build locally
npm run build
```

### 7.2 Debug Steps

1. **Local Build Test**: Run `npm run build` locally
2. **Check Logs**: Review GitHub Actions logs
3. **Verify Config**: Check `next.config.js` and `staticwebapp.config.json`
4. **Test Routes**: Verify all routes work in development

### 7.3 Getting Help

- **Azure Documentation**: [Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- **Next.js Documentation**: [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- **GitHub Actions**: [Azure Static Web Apps Action](https://github.com/Azure/static-web-apps-deploy)

## Expected Results

After successful deployment:

- ✅ Frontend loads at your Azure Static Web App URL
- ✅ All pages navigate correctly
- ✅ Icons display properly
- ✅ No console errors
- ✅ Fast loading times (CDN enabled)
- ✅ Automatic deployments on git push

## Next Steps

1. **Set up Custom Domain**: Configure your own domain
2. **Enable Monitoring**: Set up Application Insights
3. **Configure CI/CD**: Set up branch protection and automated testing
4. **Add API**: If needed, add Azure Functions for backend

Your frontend should now be successfully deployed to Azure Static Web Apps! 🚀
