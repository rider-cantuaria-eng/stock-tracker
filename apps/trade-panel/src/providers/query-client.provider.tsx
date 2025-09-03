"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryClientProviderWrapper({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
						retry: (failureCount, error) => {
							// Don't retry for 404 errors
							if (error.message.includes("404")) {
								return false;
							}
							return failureCount < 3;
						},
					},
					mutations: {
						retry: 1,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{process.env.NODE_ENV === "development" && (
				<ReactQueryDevtools initialIsOpen={false} />
			)}
		</QueryClientProvider>
	);
}
