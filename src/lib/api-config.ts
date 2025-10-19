// API configuration for different environments
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  // Production - use separate Azure Static Web Apps backend
  if (window.location.hostname.includes('azurestaticapps.net')) {
    // Replace with your actual backend Azure Static Web Apps URL
    return 'https://your-backend-app.azurestaticapps.net/api';
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
    HEALTH: '/healthz'
  }
};

export default API_CONFIG;
