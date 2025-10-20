// API configuration for different environments
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // Production - use Azure App Service backend
  if (window.location.hostname.includes('azurestaticapps.net')) {
    // Your Azure App Service backend URL
    return 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net';
  }
  
  // Development - use local backend
  return 'http://localhost:8000';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    CHAT: '/poc/chat',
    IFRS_ASK: '/poc/ifrs-ask',
    PARSE_CONTRACT: '/poc/parse-contract',
    EXPLAIN_RUN: '/poc/explain-run',
    HEALTH: '/healthz',
    VALUATION_RUNS: '/api/valuation/runs',
    CURVES: '/api/valuation/curves',
    TEST: '/api/test'
  }
};

export default API_CONFIG;
