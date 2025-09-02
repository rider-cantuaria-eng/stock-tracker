"use client";

import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";

import { ModalCreateTrade } from "./create-modal.component";
import { useTradesGrid } from "./hooks/trades-grid.hook";

import "../trades-table.style.css";

export function TradesTable() {
	const { theme } = useTheme();
	const { colDefs, gridRef, rowData } = useTradesGrid();

	return (
		<div
			className={`${theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"} !w-full h-fit bg-background-secondary rounded-md p-7`}
		>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-medium text-foreground-secondary">Trades</h2>
				<ModalCreateTrade />
			</div>
			<AgGridReact
				theme="legacy"
				ref={gridRef}
				columnDefs={colDefs}
				rowData={rowData}
				className="!h-[595px] mt-8"
				rowHeight={55}
				pagination={true}
				paginationPageSize={20}
			/>
		</div>
	);
}
