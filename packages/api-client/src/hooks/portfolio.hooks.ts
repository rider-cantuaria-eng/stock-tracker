import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { ICreatePortfolioRequest, IUpdatePortfolioRequest } from "../types";

// Query keys
export const portfolioKeys = {
  all: ["portfolios"] as const,
  lists: () => [...portfolioKeys.all, "list"] as const,
  list: (filters: string) => [...portfolioKeys.lists(), { filters }] as const,
  details: () => [...portfolioKeys.all, "detail"] as const,
  detail: (id: string) => [...portfolioKeys.details(), id] as const,
};

// Portfolio hooks
export function usePortfolios() {
  return useQuery({
    queryKey: portfolioKeys.lists(),
    queryFn: () => apiClient.getPortfolios(),
    select: (data) => data.data, // Extract only the data from ApiResponse wrapper
  });
}

export function usePortfolio(id: string) {
  return useQuery({
    queryKey: portfolioKeys.detail(id),
    queryFn: () => apiClient.getPortfolio(id),
    select: (data) => data.data,
    enabled: !!id, // Only execute if ID is present
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePortfolioRequest) => apiClient.createPortfolio(data),
    onSuccess: () => {
      // Invalidate portfolios list to reload
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdatePortfolioRequest }) => 
      apiClient.updatePortfolio(id, data),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific detail
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
      queryClient.invalidateQueries({ queryKey: portfolioKeys.detail(variables.id) });
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.deletePortfolio(id),
    onSuccess: () => {
      // Invalidate portfolios list
      queryClient.invalidateQueries({ queryKey: portfolioKeys.lists() });
    },
  });
}
