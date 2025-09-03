"use client";

import { NoSSR } from "@/src/components/layout/no-ssr.component";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

import { UseRecentsTradeGrid } from "./hooks/recent-trades-grid.hook";

import "../trades-table.style.css";

export function RecentsTradeTable() {
	const { id: portfolioId } = useParams();
	const { colDefs, gridRef, rowData, rowDataLoading, loading } = UseRecentsTradeGrid(
		portfolioId as string,
	);
	const { theme } = useTheme();

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

				<Button className="w-full !text-foreground-secondary !bg-background mt-16">
					Show more
				</Button>
			</div>
		</NoSSR>
	);
}
