import {
  ApiResponse,
  N8nChatRequest,
  N8nChatResponse,
  N8nSyncRequest,
  N8nSyncResponse,
} from "@/types";

const API_VERSION = "v1";

class N8nApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_N8N_API_URL || "http://localhost:5678";
    this.apiKey = process.env.N8N_API_KEY || "";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}/webhook/${API_VERSION}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": this.apiKey,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: errorData.message || response.statusText,
            details: errorData,
          },
        };
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      };
    }
  }

  async chat(request: N8nChatRequest): Promise<ApiResponse<N8nChatResponse>> {
    return this.request<N8nChatResponse>("/chat", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async syncNotionContent(
    request: N8nSyncRequest
  ): Promise<ApiResponse<N8nSyncResponse>> {
    return this.request<N8nSyncResponse>("/sync/notion", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async getSyncStatus(
    organizationId: string
  ): Promise<ApiResponse<{ lastSync?: Date; status: string }>> {
    return this.request(`/sync/status/${organizationId}`, {
      method: "GET",
    });
  }
}

export const n8nApi = new N8nApiClient();
