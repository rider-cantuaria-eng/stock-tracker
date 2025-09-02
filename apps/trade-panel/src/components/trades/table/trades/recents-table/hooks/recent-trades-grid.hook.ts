"use client";

import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useRef, useState } from "react";

import { PairHoldingCell, PnLCell } from "../../cell-render";
import { ITrade } from "../../hooks/trades-grid.hook";

ModuleRegistry.registerModules([AllCommunityModule]);

export const styleCell = {
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	color: "#81818B",
};

export function UseRecentsTradeGrid() {
	const gridRef = useRef<AgGridReact>(null);

	const [rowData, _] = useState<ITrade[]>([
		{
			id: 101,
			ticker: "AAPL",
			entry_price: 150.0,
			exit_price: 160.0,
			quantity: 30,
			datetime: "2025-09-01T10:30:00Z",
			imagem: {
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
			},
		},
		{
			id: 102,
			ticker: "GOOGL",
			entry_price: 2800.0,
			exit_price: 2850.0,
			quantity: 5,
			datetime: "2025-09-01T14:45:00Z",
			imagem: {
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
			},
		},
		{
			id: 103,
			ticker: "TSLA",
			entry_price: 700.0,
			exit_price: 750.0,
			quantity: 8,
			datetime: "2025-09-01T12:15:00Z",
			imagem: {
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
			},
		},
		{
			id: 104,
			ticker: "BTC",
			entry_price: 50000.0,
			exit_price: 52000.0,
			quantity: 0.5,
			datetime: "2025-09-02T09:15:00Z",
			imagem: {
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
			},
		},
		{
			id: 105,
			ticker: "ETH",
			entry_price: 3000.0,
			exit_price: 3200.0,
			quantity: 2,
			datetime: "2025-09-02T11:00:00Z",
			imagem: {
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
			},
		},
	]);

	const colDefs = useMemo<ColDef<ITrade>[]>(
		() => [
			{
				field: "ticker",
				headerName: "Ticker",
				flex: 1,
				cellStyle: styleCell,
				cellRenderer: PairHoldingCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					data: params?.data,
				}),
			},
			{
				field: "quantity",
				headerName: "Protift / Loss",
				flex: 1,
				cellStyle: styleCell,
				cellRenderer: PnLCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					data: params?.data,
				}),
			},
		],
		[],
	);

	return {
		colDefs,
		rowData,
		gridRef,
	};
}
