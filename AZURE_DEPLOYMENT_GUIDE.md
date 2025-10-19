# Azure Deployment Guide

## 🚀 **Deployment Steps**

### **1. Prerequisites**
- Azure account with Static Web Apps resource
- GitHub repository with the code
- Azure Static Web Apps API token

### **2. Backend Configuration**

The backend has been configured for Azure deployment with:

- **Startup Script**: `backend/start_backend.py` - Ensures correct directory
- **Azure Main**: `backend/app/main_azure.py` - Simplified for Azure
- **Requirements**: `backend/requirements.txt` - Python dependencies
- **Configuration**: `staticwebapp.config.json` - Azure Static Web Apps config

### **3. Environment Variables**

Set these in Azure Static Web Apps:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_actual_openai_key_here
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-large

# Feature Flags
POC_ENABLE_IFRS=true
POC_ENABLE_PARSE=true
POC_ENABLE_EXPLAIN=true

# Server Configuration
PORT=8000
HOST=0.0.0.0
```

### **4. GitHub Actions Setup**

1. **Copy the workflow file**:
   ```bash
   cp azure-deploy.yml .github/workflows/
   ```

2. **Set up secrets in GitHub**:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Your Azure Static Web Apps API token
   - `GITHUB_TOKEN`: Automatically provided by GitHub

### **5. Deployment Process**

1. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Add Azure deployment configuration"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the frontend (Next.js)
   - Build the backend (FastAPI)
   - Deploy to Azure Static Web Apps

### **6. Backend Startup Fix**

The backend startup issue is fixed with:

- **Correct Directory**: `start_backend.py` ensures running from `backend/` directory
- **Azure Compatibility**: `main_azure.py` is simplified for Azure deployment
- **Environment Variables**: Properly configured for Azure environment

### **7. Testing the Deployment**

After deployment:

1. **Frontend**: `https://your-app.azurestaticapps.net`
2. **Backend API**: `https://your-app.azurestaticapps.net/api/health`
3. **Chatbot**: Should work with your OpenAI API key

### **8. Troubleshooting**

If the backend doesn't start:

1. **Check Azure logs** in the Azure portal
2. **Verify environment variables** are set correctly
3. **Check the startup script** is being used
4. **Ensure Python dependencies** are installed

### **9. Local Testing**

To test locally before deployment:

```bash
# Start backend
cd backend
python start_backend.py

# Start frontend
cd frontend
npm run dev
```

## 🎯 **Key Changes Made**

1. **Fixed Backend Startup**: Created `start_backend.py` to ensure correct directory
2. **Azure Compatibility**: Created `main_azure.py` for Azure deployment
3. **Dependencies**: Added `requirements.txt` for Python packages
4. **Configuration**: Added `staticwebapp.config.json` for Azure Static Web Apps
5. **GitHub Actions**: Created workflow for automated deployment

The chatbot should now work properly on Azure with your OpenAI API key!
