/**
 * NEXUS API Client
 * Handles all HTTP requests to the backend with tenant isolation
 */

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class APIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  }

  /**
   * Get tenant ID from localStorage or environment
   */
  private getTenantId(): string | null {
    if (typeof window === 'undefined') return null;
    
    // In production: extract from subdomain
    // In development: use env variable or localStorage
    return (
      localStorage.getItem('tenant_id') ||
      process.env.NEXT_PUBLIC_TENANT_ID ||
      null
    );
  }

  /**
   * Make HTTP request with automatic tenant ID injection
   */
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    // Inject tenant ID header
    const tenantId = this.getTenantId();
    if (tenantId) {
      headers['X-Tenant-ID'] = tenantId;
    }

    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include', // Include session cookies
        headers,
      });

      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        throw new APIError(
          errorData.message || response.statusText,
          response.status,
          errorData
        );
      }

      // Parse JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      // Network or other errors
      throw new APIError(
        error instanceof Error ? error.message : 'Network error',
        0
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  /**
   * Upload file
   */
  async upload<T>(endpoint: string, file: File): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const tenantId = this.getTenantId();
    const headers: HeadersInit = {};
    if (tenantId) {
      headers['X-Tenant-ID'] = tenantId;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || response.statusText,
        response.status,
        errorData
      );
    }

    return response.json();
  }
}

// Export singleton instance
export const api = new APIClient();
export { APIError };
