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

// Report Types
export type TTradePeriodType = "7d" | "15d" | "1m" | "6m" | "1y" | "all";

export interface ITradeReportDataPoint {
  label: string;
  value: number;
}

export type ITradeReport = ITradeReportDataPoint[];

// Pagination Types
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}

export interface IPaginatedApiResponse<T> {
  message: string;
  data: T[];
  pagination: IPaginationMeta;
}

// Portfolio Balance Types
export interface IPortfolioBalance {
  portfolioId: string;
  portfolioName: string;
  initialValue: number;
  totalTradesValue: number;
  totalTrades: number;
  profitLoss: number;
  profitLossPercentage: number;
}
