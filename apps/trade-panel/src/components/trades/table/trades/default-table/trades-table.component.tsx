"use client";

import { usePortfolio } from "@workspace/api-client/hooks";
import { ITrade } from "@workspace/api-client/types";
import { cn } from "@workspace/ui/lib/utils";
import { RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { useState } from "react";

import { NoSSR } from "../../../../../components/layout/no-ssr.component";
import { ModalCreateTrade } from "../../../../modal/trade/create-trade.modal.component";
import { ModalEditTrade } from "../../../../modal/trade/update-trade.modal.component";
import "../trades-table.style.css";
import { useTradesGrid } from "./hooks/trades-grid.hook";

export function TradesTable() {
	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string);
	const [selectedTrade, setSelectedTrade] = useState<ITrade | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const { colDefs, gridRef, rowData, rowDataLoading } = useTradesGrid(
		portfolioId as string,
	);
	const { theme } = useTheme();

	const handleRowClick = (event: RowClickedEvent) => {
		const trade = event.data as ITrade;
		setSelectedTrade(trade);
		setIsEditModalOpen(true);
	};

	return (
		<div className={`flex-1 !w-full h-fit bg-background-secondary rounded-md p-7 `}>
			<div className="flex flex-col sm:flex-row justify-between items-center">
				<div>
					<h2 className="text-xl font-medium text-foreground-secondary text-center sm:text-start">
						Trades
					</h2>
					<p className="text-sm text-foreground-secondary text-center sm:text-start">
						All your portfolio trades tracked. <b>To edit a trade, click on it.</b>
					</p>
				</div>

				<ModalCreateTrade title={`New Trade for ${portfolio.data?.name}`} />
			</div>
			<NoSSR>
				<div
					className={cn(
						`mt-4 w-full h-full min-h-[400px]`,
						theme === "light" ? "ag-theme-quartz" : "ag-theme-quartz-dark",
					)}
				>
					<AgGridReact
						ref={gridRef}
						rowData={portfolio?.isLoading ? rowDataLoading[0] : rowData}
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
						onRowClicked={handleRowClick}
						rowStyle={{ cursor: "pointer" }}
					/>
				</div>
			</NoSSR>
			<ModalEditTrade
				isOpen={isEditModalOpen}
				onOpenChange={setIsEditModalOpen}
				trade={selectedTrade}
			/>
		</div>
	);
}
