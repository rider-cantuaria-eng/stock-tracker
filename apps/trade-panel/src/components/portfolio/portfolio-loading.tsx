import { SkeletonCard, Skeleton } from "../ui/loading";

export function PortfolioSummaryLoading() {
	return (
		<div className="space-y-6">
			{/* Header skeleton */}
			<div className="space-y-2">
				<Skeleton className="h-8 w-64" />
				<Skeleton className="h-4 w-48" />
			</div>

			{/* Stats cards skeleton */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<SkeletonCard key={i} />
				))}
			</div>

			{/* Chart skeleton */}
			<div className="rounded-lg border p-6">
				<Skeleton className="h-6 w-40 mb-4" />
				<Skeleton className="h-64 w-full" />
			</div>
		</div>
	);
}

export function PortfolioListLoading() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-6 w-48 mb-6" />
			<div className="grid gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<div key={i} className="rounded-lg border p-4 space-y-3">
						<div className="flex justify-between items-start">
							<div className="space-y-2">
								<Skeleton className="h-5 w-32" />
								<Skeleton className="h-4 w-24" />
							</div>
							<Skeleton className="h-8 w-20" />
						</div>
						<div className="flex justify-between">
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-20" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
