// API configuration for different environments
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // Debug logging
  console.log('Environment detection:', {
    hostname: window.location.hostname,
    href: window.location.href,
    isLocalhost: ['localhost', '127.0.0.1'].includes(window.location.hostname),
    isAzure: window.location.hostname.includes('azurestaticapps.net'),
    isProduction: !['localhost', '127.0.0.1'].includes(window.location.hostname)
  });
  
  // Check if running on localhost
  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  
  // Use local backend for development, Azure backend for production
  const backendUrl = isLocalhost
    ? 'http://localhost:9000'
    : 'https://valuation-backend-api-cadmfqgxgzawa7fp.canadacentral-01.azurewebsites.net';
  
  console.log('Selected backend URL:', backendUrl);
  return backendUrl;
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
