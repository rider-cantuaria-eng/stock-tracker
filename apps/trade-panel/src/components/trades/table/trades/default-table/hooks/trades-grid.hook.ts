"use client";

import { ITrade } from "@workspace/api-client/types";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef, useState } from "react";

import { DateCell, PairHoldingCell, PnLCell, PriceCell } from "../../cell-render/index";
import { QuantityCell } from "../../cell-render/quantity.component";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export function useTradesGrid() {
	const gridRef = useRef<AgGridReact>(null);

	const [rowData] = useState<ITrade[]>([
		{
			id: "101",
			ticker: "AAPL",
			entryPrice: 150.0,
			exitPrice: 160.0,
			quantity: 30,
			date: "2025-09-01T10:30:00Z",
			portfolioId: "1",
			createdAt: "2025-09-01T10:30:00Z",
			updatedAt: "2025-09-01T10:30:00Z",
		},
		{
			id: "102",
			ticker: "GOOGL",
			entryPrice: 2800.0,
			exitPrice: 2850.0,
			quantity: 5,
			date: "2025-09-01T14:45:00Z",
			portfolioId: "1",
			createdAt: "2025-09-01T14:45:00Z",
			updatedAt: "2025-09-01T14:45:00Z",
		},
		{
			id: "103",
			ticker: "TSLA",
			entryPrice: 700.0,
			exitPrice: 750.0,
			quantity: 8,
			date: "2025-09-01T12:15:00Z",
			portfolioId: "1",
			createdAt: "2025-09-01T12:15:00Z",
			updatedAt: "2025-09-01T12:15:00Z",
		},
		{
			id: "104",
			ticker: "BTC",
			entryPrice: 50000.0,
			exitPrice: 52000.0,
			quantity: 0.5,
			date: "2025-09-02T09:15:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T09:15:00Z",
			updatedAt: "2025-09-02T09:15:00Z",
		},
		{
			id: "105",
			ticker: "ETH",
			entryPrice: 3000.0,
			exitPrice: 3200.0,
			quantity: 2,
			date: "2025-09-02T11:00:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T11:00:00Z",
			updatedAt: "2025-09-02T11:00:00Z",
		},
		{
			id: "1043",
			ticker: "dBTC",
			entryPrice: 50000.0,
			exitPrice: 52000.0,
			quantity: 0.5,
			date: "2025-09-02T09:15:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T09:15:00Z",
			updatedAt: "2025-09-02T09:15:00Z",
		},
		{
			id: "1035",
			ticker: "ETsH",
			entryPrice: 3000.0,
			exitPrice: 3200.0,
			quantity: 2,
			date: "2025-09-02T11:00:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T11:00:00Z",
			updatedAt: "2025-09-02T11:00:00Z",
		},
		{
			id: "10352312",
			ticker: "ETsH",
			entryPrice: 3000.0,
			exitPrice: 3200.0,
			quantity: 2,
			date: "2025-09-02T11:00:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T11:00:00Z",
			updatedAt: "2025-09-02T11:00:00Z",
		},
		{
			id: "103512",
			ticker: "ETsH",
			entryPrice: 3000.0,
			exitPrice: 3200.0,
			quantity: 2,
			date: "2025-09-02T11:00:00Z",
			portfolioId: "1",
			createdAt: "2025-09-02T11:00:00Z",
			updatedAt: "2025-09-02T11:00:00Z",
		},
	]);

	const colDefs = useMemo<ColDef<ITrade>[]>(
		() => [
			{
				field: "ticker",
				headerName: "Ticker",
				flex: 1,
				minWidth: 200,
				cellRenderer: PairHoldingCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					data: params?.data,
				}),
			},
			{
				field: "entryPrice",
				headerName: "Entry Price",
				flex: 1,
				minWidth: 120,
				cellRenderer: PriceCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					value: params.data?.entryPrice,
				}),
			},
			{
				field: "exitPrice",
				headerName: "Exit Price",
				flex: 1,
				minWidth: 120,
				cellRenderer: PriceCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					value: params.data?.exitPrice,
				}),
			},
			{
				field: "quantity",
				headerName: "Quantity",
				flex: 1,
				minWidth: 100,
				cellRenderer: QuantityCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					quantity: params.data?.quantity,
				}),
			},
			{
				field: "quantity",
				headerName: "Profit / Loss",
				flex: 1,
				minWidth: 140,
				cellRenderer: PnLCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					data: params?.data,
				}),
			},
			{
				field: "date",
				headerName: "Date",
				flex: 1,
				minWidth: 160,
				cellRenderer: DateCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					date: new Date(params.data?.date),
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
