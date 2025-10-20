/**
 * Chat service for connecting to the valuation backend API
 */

import API_CONFIG from './api-config';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: any;
}

export interface ValuationRun {
  run_id: string;
  as_of_date: string;
  valuation_type: string;
  status: string;
  created_at: string;
  result?: any;
}

export interface Curve {
  id: string;
  name: string;
  currency: string;
  curve_type: string;
  status: string;
  nodes: number;
  version: string;
}

class ChatService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  /**
   * Send a chat message to the backend
   */
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.CHAT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response || data.message || 'I received your message but could not process it.';
    } catch (error) {
      console.error('Chat service error:', error);
      return 'Sorry, I cannot connect to the backend right now. Please check if the backend is running.';
    }
  }

  /**
   * Get valuation runs from the backend
   */
  async getValuationRuns(): Promise<ValuationRun[]> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.VALUATION_RUNS}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Failed to fetch valuation runs:', error);
      return [];
    }
  }

  /**
   * Get curves from the backend
   */
  async getCurves(): Promise<Curve[]> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.CURVES}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error('Failed to fetch curves:', error);
      return [];
    }
  }

  /**
   * Check if the backend is healthy
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.HEALTH}`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  /**
   * Get backend status and available data
   */
  async getBackendStatus(): Promise<{
    healthy: boolean;
    runs: number;
    curves: number;
    lastRun?: ValuationRun;
  }> {
    try {
      const [health, runs, curves] = await Promise.all([
        this.checkHealth(),
        this.getValuationRuns(),
        this.getCurves()
      ]);

      return {
        healthy: health,
        runs: runs.length,
        curves: curves.length,
        lastRun: runs.length > 0 ? runs[0] : undefined
      };
    } catch (error) {
      console.error('Failed to get backend status:', error);
      return {
        healthy: false,
        runs: 0,
        curves: 0
      };
    }
  }

  /**
   * Create a new valuation run
   */
  async createValuationRun(runData: {
    as_of_date: string;
    valuation_type: string;
    spec: any;
    market_data_profile?: string;
  }): Promise<{ run_id: string; status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}${API_CONFIG.ENDPOINTS.VALUATION_RUNS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(runData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create valuation run:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const chatService = new ChatService();
export default chatService;



