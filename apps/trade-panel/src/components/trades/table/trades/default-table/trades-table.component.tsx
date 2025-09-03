"use client";

import { usePortfolio } from "@workspace/api-client/hooks";
import { cn } from "@workspace/ui/lib/utils";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

import { NoSSR } from "../../../../../components/layout/no-ssr.component";
import { ModalCreateTrade } from "../../../../modal/trade/create-trade.modal.component";
import "../trades-table.style.css";
import { useTradesGrid } from "./hooks/trades-grid.hook";

export function TradesTable() {
	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string);

	const { colDefs, gridRef, rowData } = useTradesGrid();
	const { theme } = useTheme();

	return (
		<div className={` !w-full h-fit bg-background-secondary rounded-md p-7 `}>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-medium text-foreground-secondary">Trades</h2>
				<ModalCreateTrade title={`New Trade for ${portfolio.data?.name}`} />
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
