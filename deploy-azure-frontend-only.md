# Azure Static Web App Deployment - Frontend Only

This guide is specifically for deploying the `valuation-agent-frontend` repository to Azure Static Web Apps.

## Repository Structure Assumption

Your `valuation-agent-frontend` repository likely has this structure:
```
valuation-agent-frontend/
├── app/                     # Next.js app directory
├── components/              # React components
├── public/                  # Static assets
├── styles/                 # CSS files
├── package.json            # Node.js dependencies
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## Step 1: Azure Portal Configuration

### 1.1 Create Static Web App

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create Resource**: Click "Create a resource"
3. **Search for "Static Web Apps"**: Select "Static Web Apps"
4. **Click "Create"**

### 1.2 Configure the Static Web App

Fill in the following details:

- **Subscription**: Select your Azure subscription
- **Resource Group**: Create new or select existing
- **Name**: `valuation-agent-frontend` (or your preferred name)
- **Plan Type**: Free (for development) or Standard (for production)
- **Region**: Choose closest to your users
- **Source**: GitHub
- **GitHub Account**: Sign in and authorize
- **Organization**: Select your GitHub organization
- **Repository**: `valuation-agent-frontend`
- **Branch**: `main`

### 1.3 Build Configuration

**IMPORTANT**: Use these exact settings:

- **Build Presets**: Custom
- **App Location**: `/` (root of repository)
- **API Location**: (leave empty - no API)
- **Output Location**: `out`

## Step 2: Fix Frontend Issues

### 2.1 Duplicate Import Errors

The terminal shows duplicate import errors in `app/runs/page.tsx`. You need to fix these:

1. **Remove duplicate imports** from the lucide-react import statement
2. **Ensure each icon is imported only once**

### 2.2 Next.js Configuration

Update your `next.config.js` for static export:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove headers for static export
  // Headers don't work with static export
}

module.exports = nextConfig
```

## Step 3: GitHub Actions Setup

### 3.1 Add GitHub Secret

1. Go to your `valuation-agent-frontend` repository
2. Go to "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Get this from Azure Portal → Your Static Web App → "Manage deployment token"

### 3.2 GitHub Actions Workflow

The workflow file should be placed at:
`.github/workflows/azure-static-web-apps.yml`

## Step 4: Deploy

### 4.1 Automatic Deployment

Once configured, push to main branch:

```bash
git add .
git commit -m "Fix duplicate imports and configure for Azure deployment"
git push origin main
```

### 4.2 Monitor Deployment

1. Go to GitHub Actions tab in your repository
2. Watch the "Azure Static Web Apps CI/CD" workflow
3. Check for any build errors

## Step 5: Test Your Deployment

### 5.1 Check Frontend

1. Go to your Static Web App URL (provided in Azure Portal)
2. Verify the frontend loads correctly
3. Test navigation between pages
4. Check that all icons load properly

### 5.2 Common Issues

#### **Build Failures**
- Check GitHub Actions logs for specific errors
- Ensure all imports are correct
- Verify Next.js configuration

#### **Missing Icons**
- Check lucide-react imports
- Ensure no duplicate imports
- Verify icon names are correct

#### **Routing Issues**
- Check `staticwebapp.config.json` configuration
- Verify SPA routing is set up correctly

## Step 6: Production Considerations

### 6.1 Environment Variables

For production, you may need to configure environment variables in Azure Portal:

1. Go to your Static Web App
2. Go to "Configuration" → "Application settings"
3. Add any required environment variables

### 6.2 Custom Domain

1. Go to "Custom domains" in your Static Web App
2. Add your domain name
3. Follow DNS configuration instructions

### 6.3 Performance

- Azure CDN is automatically enabled
- Static assets are optimized
- Global distribution is available

## Troubleshooting

### Common Build Errors

1. **Duplicate Imports**: Fix lucide-react imports
2. **TypeScript Errors**: Check type definitions
3. **Missing Dependencies**: Run `npm install`
4. **Build Configuration**: Verify Next.js config

### Debug Steps

1. **Local Build**: Run `npm run build` locally
2. **Check Logs**: Review GitHub Actions logs
3. **Test Locally**: Run `npm run dev` to test
4. **Verify Config**: Check `next.config.js` settings

## Expected Results

After successful deployment:

- ✅ Frontend loads at your Azure Static Web App URL
- ✅ All pages navigate correctly
- ✅ Icons display properly
- ✅ No console errors
- ✅ Fast loading times (CDN enabled)

## Next Steps

1. **Monitor Performance**: Use Azure Portal metrics
2. **Set up Monitoring**: Enable Application Insights
3. **Configure CI/CD**: Set up branch protection
4. **Add Custom Domain**: Configure your domain

Your frontend-only deployment should now work correctly on Azure Static Web Apps! 🚀
