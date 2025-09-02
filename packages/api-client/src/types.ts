// API Request Types
export interface ICreatePortfolioRequest {
  name: string;
  initialValue: number;
}

export interface IUpdatePortfolioRequest {
  name?: string;
  initialValue?: number;
}

export interface ICreateTradeRequest {
  ticker: string;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  date: string;
}

export interface IUpdateTradeRequest {
  ticker?: string;
  entryPrice?: number;
  exitPrice?: number;
  quantity?: number;
  date?: string;
}

// Domain Models
export interface IPortfolio {
  id: string;
  name: string;
  initialValue: number;
  createdAt: string;
  updatedAt: string;
}

export interface ITrade {
  id: string;
  ticker: string;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  date: string;
  portfolioId: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface IApiResponse<T> {
  message: string;
  data: T;
}

export interface IApiError {
  message: string;
  inputs?: Record<string, string[]>;
}
