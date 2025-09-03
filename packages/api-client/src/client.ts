import type {
  IApiResponse,
  IApiError,
  IPortfolio,
  ITrade,
  ICreatePortfolioRequest,
  IUpdatePortfolioRequest,
  ICreateTradeRequest,
  IUpdateTradeRequest,
  ITradeReport,
  TTradePeriodType
} from "./types";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3001") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: IApiError = await response.json();
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  // Portfolio endpoints
  async getPortfolios(): Promise<IApiResponse<IPortfolio[]>> {
    return this.request<IApiResponse<IPortfolio[]>>("/portfolios");
  }

  async getPortfolio(id: string): Promise<IApiResponse<IPortfolio>> {
    return this.request<IApiResponse<IPortfolio>>(`/portfolios/${id}`);
  }

  async createPortfolio(data: ICreatePortfolioRequest): Promise<IApiResponse<IPortfolio>> {
    return this.request<IApiResponse<IPortfolio>>("/portfolios", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id: string, data: IUpdatePortfolioRequest): Promise<IApiResponse<IPortfolio>> {
    return this.request<IApiResponse<IPortfolio>>(`/portfolios/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id: string): Promise<IApiResponse<null>> {
    return this.request<IApiResponse<null>>(`/portfolios/${id}`, {
      method: "DELETE",
    });
  }

  // Trade endpoints
  async getTrades(portfolioId: string): Promise<IApiResponse<ITrade[]>> {
    return this.request<IApiResponse<ITrade[]>>(`/portfolios/${portfolioId}/trades`);
  }

  async getTrade(portfolioId: string, tradeId: string): Promise<IApiResponse<ITrade>> {
    return this.request<IApiResponse<ITrade>>(`/portfolios/${portfolioId}/trades/${tradeId}`);
  }

  async createTrade(portfolioId: string, data: ICreateTradeRequest): Promise<IApiResponse<ITrade>> {
    return this.request<IApiResponse<ITrade>>(`/portfolios/${portfolioId}/trades`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTrade(portfolioId: string, tradeId: string, data: IUpdateTradeRequest): Promise<IApiResponse<ITrade>> {
    return this.request<IApiResponse<ITrade>>(`/portfolios/${portfolioId}/trades/${tradeId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteTrade(portfolioId: string, tradeId: string): Promise<IApiResponse<null>> {
    return this.request<IApiResponse<null>>(`/portfolios/${portfolioId}/trades/${tradeId}`, {
      method: "DELETE",
    });
  }

  // Report endpoints
  async getTradeReport(portfolioId: string, period: TTradePeriodType): Promise<IApiResponse<ITradeReport>> {    
    return this.request<IApiResponse<ITradeReport>>(`/portfolios/${portfolioId}/trades/report?period=${period}`);
  }
}

// Singleton client instance
export const apiClient = new ApiClient();

export default ApiClient;
