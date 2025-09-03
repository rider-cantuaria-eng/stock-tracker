"use client";

import { cn } from "@workspace/ui/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";

import { ModalCreateTrade } from "./create-modal.component";
import { useTradesGrid } from "./hooks/trades-grid.hook";

import "../trades-table.style.css";
import { NoSSR } from "@/src/components/layout/no-ssr.component";

export function TradesTable() {
	const { colDefs, gridRef, rowData } = useTradesGrid();
	const { theme } = useTheme();

	return (
		<div className={` !w-full h-fit bg-background-secondary rounded-md p-7 `}>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-medium text-foreground-secondary">Trades</h2>
				<ModalCreateTrade />
			</div>
			<NoSSR>
				<div
					className={cn(
						`mt-4 w-full`,
						theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark",
					)}
				>
					<AgGridReact
						ref={gridRef}
						rowData={rowData}
						columnDefs={colDefs}
						rowHeight={63}
						domLayout="autoHeight"
						pagination={true}
						paginationPageSize={8}
						defaultColDef={{
							resizable: true,
							sortable: true,
							flex: 1,
							minWidth: 100,
						}}
						paginationPageSizeSelector={false}
						theme="legacy"
					/>
				</div>
			</NoSSR>
		</div>
	);
}
