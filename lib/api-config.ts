// API configuration for different environments
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // Debug logging
  console.log('Environment detection:', {
    hostname: window.location.hostname,
    href: window.location.href,
    isAzure: window.location.hostname.includes('azurestaticapps.net'),
    isLocalhost: ['localhost', '127.0.0.1'].includes(window.location.hostname)
  });
  
  // Production - use Azure App Service backend
  if (window.location.hostname.includes('azurestaticapps.net')) {
    console.log('Using Azure backend for production');
    return 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net';
  }
  
  // Development - use local backend
  console.log('Using localhost backend for development');
  return 'http://localhost:9000';
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
