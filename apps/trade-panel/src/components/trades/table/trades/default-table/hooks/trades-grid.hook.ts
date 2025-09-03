"use client";

import { useTrades } from "@workspace/api-client/hooks";
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

export function useTradesGrid(portfolioId?: string) {
	const gridRef = useRef<AgGridReact>(null);

	const rowDataLoading = useState(
		Array(8).fill({
			id: null,
			ticker: null,
			entryPrice: 0,
			exitPrice: 0,
			quantity: 0,
			date: new Date(),
			portfolioId: null,
			createdAt: null,
			updatedAt: null,
		}),
	);

	const trades = useTrades(portfolioId as string);

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
					id: params?.data?.id,
					date: new Date(params.data?.date),
				}),
			},
		],
		[],
	);

	return {
		colDefs,
		rowData: trades.data,
		gridRef,
		rowDataLoading,
	};
}
