export type TTradePeriodType = "7d" | "15d" | "1m" | "6m" | "1y" | "all";

export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPortfolioBalance {
  portfolioId: string;
  portfolioName: string;
  initialValue: number;
  totalTradesValue: number;
  totalTrades: number;
  profitLoss: number;
  profitLossPercentage: number;
}
