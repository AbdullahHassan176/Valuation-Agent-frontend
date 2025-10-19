/**
 * API client for backend communication
 */

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE || 'http://localhost:8001';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

interface SSEEvent {
  event: string;
  data: any;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string | null = null;

  constructor(baseUrl: string = BACKEND_BASE) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
  }

  setApiKey(apiKey: string | null) {
    this.apiKey = apiKey;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private getHeaders(init?: RequestInit): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Copy existing headers if they exist
    if (init?.headers) {
      if (init.headers instanceof Headers) {
        init.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(init.headers)) {
        init.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, init.headers);
      }
    }

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    return headers;
  }

  async getJson<T = any>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(init),
        ...init,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.detail || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  async postJson<T = any>(path: string, body: any, init?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: this.getHeaders(init),
        body: JSON.stringify(body),
        ...init,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.detail || `HTTP ${response.status}`,
          status: response.status,
        };
      }

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      };
    }
  }

  streamSSE(pathWithQuery: string, onEvent: (event: SSEEvent) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${pathWithQuery.startsWith('/') ? pathWithQuery : `/${pathWithQuery}`}`;
      
      const headers: HeadersInit = {};
      if (this.apiKey) {
        headers['X-API-Key'] = this.apiKey;
      }

      const eventSource = new EventSource(url, {
        withCredentials: false,
      });

      eventSource.onopen = () => {
        console.log('SSE connection opened');
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'message',
            data,
          });
        } catch (error) {
          console.error('Error parsing SSE data:', error);
        }
      };

      eventSource.addEventListener('TOOL_CALLED', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'TOOL_CALLED',
            data,
          });
        } catch (error) {
          console.error('Error parsing TOOL_CALLED event:', error);
        }
      });

      eventSource.addEventListener('TOKEN', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'TOKEN',
            data,
          });
        } catch (error) {
          console.error('Error parsing TOKEN event:', error);
        }
      });

      eventSource.addEventListener('CITATIONS', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'CITATIONS',
            data,
          });
        } catch (error) {
          console.error('Error parsing CITATIONS event:', error);
        }
      });

      eventSource.addEventListener('CONFIDENCE', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'CONFIDENCE',
            data,
          });
        } catch (error) {
          console.error('Error parsing CONFIDENCE event:', error);
        }
      });

      eventSource.addEventListener('DONE', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'DONE',
            data,
          });
          eventSource.close();
          resolve();
        } catch (error) {
          console.error('Error parsing DONE event:', error);
          eventSource.close();
          resolve();
        }
      });

      eventSource.addEventListener('ERROR', (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent({
            event: 'ERROR',
            data,
          });
          eventSource.close();
          reject(new Error(data.error || 'SSE error'));
        } catch (error) {
          console.error('Error parsing ERROR event:', error);
          eventSource.close();
          reject(error);
        }
      });

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        eventSource.close();
        reject(new Error('SSE connection failed'));
      };
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Export types
export type { ApiResponse, SSEEvent };
