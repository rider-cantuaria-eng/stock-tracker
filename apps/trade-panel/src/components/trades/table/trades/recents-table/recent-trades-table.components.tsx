"use client";
import { AgGridReact } from "ag-grid-react";
import { useTheme } from "next-themes";

import { UseRecentsTradeGrid } from "./hooks/recent-trades-grid.hook";

import "../trades-table.style.css";

export function RecentsTradeTable() {
	const { colDefs, gridRef, rowData } = UseRecentsTradeGrid();
	const { theme } = useTheme();

	return (
		<div
			className={`${theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"} !w-full h-fit bg-background-secondary rounded-md p-7`}
		>
			<h2 className="text-xl font-medium text-foreground-secondary">Recents Trades</h2>
			<AgGridReact
				theme="legacy"
				ref={gridRef}
				columnDefs={colDefs}
				rowData={rowData}
				className="!h-[340px] mt-8"
				rowHeight={55}
			/>
		</div>
	);
}
