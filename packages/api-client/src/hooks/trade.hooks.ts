import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { ICreateTradeRequest, IUpdateTradeRequest, TTradePeriodType } from "../types";

// Query keys
export const tradeKeys = {
  all: ["trades"] as const,
  lists: () => [...tradeKeys.all, "list"] as const,
  list: (portfolioId: string) => [...tradeKeys.lists(), { portfolioId }] as const,
  recents: () => [...tradeKeys.all, "recents"] as const,
  recent: (portfolioId: string, page?: number) => [...tradeKeys.recents(), { portfolioId, page }] as const,
  details: () => [...tradeKeys.all, "detail"] as const,
  detail: (portfolioId: string, tradeId: string) => [...tradeKeys.details(), portfolioId, tradeId] as const,
  reports: () => [...tradeKeys.all, "reports"] as const,
  report: (portfolioId: string, period: TTradePeriodType) => [...tradeKeys.all, "report", { portfolioId, period }] as const,
  balances: () => [...tradeKeys.all, "balances"] as const,
  balance: (portfolioId: string) => [...tradeKeys.balances(), { portfolioId }] as const,
};

// Trade hooks
export function useTrades(portfolioId: string) {
  return useQuery({
    queryKey: tradeKeys.list(portfolioId),
    queryFn: () => apiClient.getTrades(portfolioId),
    select: (data) => data.data, // Extract only the data from ApiResponse wrapper
    enabled: !!portfolioId, // Only execute if portfolioId is present
  });
}

export function useTrade(portfolioId: string, tradeId: string) {
  return useQuery({
    queryKey: tradeKeys.detail(portfolioId, tradeId),
    queryFn: () => apiClient.getTrade(portfolioId, tradeId),
    select: (data) => data.data,
    enabled: !!(portfolioId && tradeId), // Only execute if both IDs are present
  });
}

export function useRecentTrades(portfolioId: string, page?: number) {
  return useQuery({
    queryKey: tradeKeys.recent(portfolioId, page),
    queryFn: () => apiClient.getRecentTrades(portfolioId, page),
    select: (data) => ({
      trades: data.data,
      pagination: data.pagination,
    }),
    enabled: !!portfolioId, // Only execute if portfolioId is present
  });
}

export function useCreateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ portfolioId, data }: { portfolioId: string; data: ICreateTradeRequest }) => 
      apiClient.createTrade(portfolioId, data),
    onSuccess: (_, variables) => {
      // Invalidate the trades list for the specific portfolio and report
      queryClient.invalidateQueries({ queryKey: tradeKeys.list(variables.portfolioId) });
      queryClient.invalidateQueries({ queryKey: tradeKeys.recents() });
      queryClient.invalidateQueries({ queryKey: tradeKeys.report(variables.portfolioId, "7d") });
      queryClient.invalidateQueries({ queryKey: tradeKeys.balance(variables.portfolioId) });
    },
  });
}

export function useUpdateTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ portfolioId, tradeId, data }: { 
      portfolioId: string; 
      tradeId: string; 
      data: IUpdateTradeRequest 
    }) => apiClient.updateTrade(portfolioId, tradeId, data),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific detail
      queryClient.invalidateQueries({ queryKey: tradeKeys.list(variables.portfolioId) });
      queryClient.invalidateQueries({ 
        queryKey: tradeKeys.detail(variables.portfolioId, variables.tradeId) 
      });
      queryClient.invalidateQueries({ queryKey: tradeKeys.recents() });
      queryClient.invalidateQueries({ queryKey: tradeKeys.report(variables.portfolioId, "7d") });
      queryClient.invalidateQueries({ queryKey: tradeKeys.balance(variables.portfolioId) });
    },
  });
}

export function useDeleteTrade() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ portfolioId, tradeId }: { portfolioId: string; tradeId: string }) => 
      apiClient.deleteTrade(portfolioId, tradeId),
    onSuccess: (_, variables) => {
      // Invalidate the trades list for the portfolio
      queryClient.invalidateQueries({ queryKey: tradeKeys.list(variables.portfolioId) });
      queryClient.invalidateQueries({ queryKey: tradeKeys.recents() });
      queryClient.invalidateQueries({ queryKey: tradeKeys.balance(variables.portfolioId) });
    },
  });
}

// Trade Report hooks
export function useTradeReport(portfolioId: string, period: TTradePeriodType) {  
  return useQuery({
    queryKey: tradeKeys.report(portfolioId, period),
    queryFn: () => apiClient.getTradeReport(portfolioId, period),
    select: (data) => data.data, // Extract only the data from ApiResponse wrapper
    enabled: !!portfolioId && !!period, // Only execute if both parameters are present
  });
}

// Portfolio Balance hooks
export function usePortfolioBalance(portfolioId: string) {
  return useQuery({
    queryKey: tradeKeys.balance(portfolioId),
    queryFn: () => apiClient.getPortfolioBalance(portfolioId),
    select: (data) => data.data, // Extract only the data from ApiResponse wrapper
    enabled: !!portfolioId, // Only execute if portfolioId is present
  });
}
