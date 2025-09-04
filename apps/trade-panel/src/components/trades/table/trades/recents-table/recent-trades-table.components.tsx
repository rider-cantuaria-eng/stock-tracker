"use client";

import { NoSSR } from "@/src/components/layout/no-ssr.component";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import { UseRecentsTradeGrid } from "./hooks/recent-trades-grid.hook";

import "../trades-table.style.css";

export function RecentsTradeTable() {
	const [page, setPage] = useState(1);
	const { id: portfolioId } = useParams();
	const { colDefs, gridRef, rowData, rowDataLoading, loading, pagination } =
		UseRecentsTradeGrid(portfolioId as string, page);
	const { theme } = useTheme();

	// Refresh when fetch occurs
	useEffect(() => {
		if (gridRef.current && !loading) {
			gridRef.current.api.refreshCells();
		}
	}, [rowData, loading]);

	const handleNextPage = () => {
		if (pagination?.hasNextPage) {
			setPage(prevPage => prevPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (pagination?.hasPreviousPage) {
			setPage(prevPage => prevPage - 1);
		}
	};

	return (
		<NoSSR>
			<div
				className={cn(
					theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz",
					"!w-full h-fit bg-background-secondary rounded-md p-7",
				)}
			>
				<h2 className="text-xl font-medium text-foreground-secondary">Recents Trades</h2>
				<div
					className={cn(
						"mt-4 w-full h-[300px]",
						theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark",
					)}
				>
					<AgGridReact
						ref={gridRef}
						rowData={loading ? rowDataLoading[0] : rowData}
						columnDefs={colDefs}
						rowHeight={55}
						domLayout="autoHeight"
						pagination={false}
						paginationPageSize={5}
						defaultColDef={{
							sortable: true,
							flex: 1,
							minWidth: 100,
						}}
						paginationPageSizeSelector={false}
						theme="legacy"
					/>{" "}
				</div>

				<div className="flex justify-center items-center mt-16 gap-4">
					<Button
						className="flex-1 !text-foreground-secondary !bg-background"
						onClick={handlePreviousPage}
						disabled={loading || !pagination?.hasPreviousPage}
					>
						Previous
					</Button>
					<span className="text-foreground-secondary">Page {page}</span>
					<Button
						className="flex-1 !text-foreground-secondary !bg-background"
						onClick={handleNextPage}
						disabled={loading || !pagination?.hasNextPage}
					>
						Next
					</Button>
				</div>
			</div>
		</NoSSR>
	);
}
