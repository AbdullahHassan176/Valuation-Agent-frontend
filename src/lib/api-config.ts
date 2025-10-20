// API configuration for different environments
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // Check if running on localhost
  const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  
  // Use local backend for development, Azure backend for production
  return isLocalhost
    ? 'http://localhost:9000'
    : 'https://valuation-backend-ephph9gkdjcca0c0.canadacentral-01.azurewebsites.net';
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
