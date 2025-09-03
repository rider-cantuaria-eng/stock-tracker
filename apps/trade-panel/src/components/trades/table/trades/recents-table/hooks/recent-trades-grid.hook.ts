"use client";

import { useTrades } from "@workspace/api-client/hooks";
import { ITrade } from "@workspace/api-client/types";
import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useRef } from "react";

import { PairHoldingCell, PnLCell } from "../../cell-render";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export function UseRecentsTradeGrid(portfolioId: string) {
	const gridRef = useRef<AgGridReact>(null);
	const trades = useTrades(portfolioId);

	const colDefs = useMemo<ColDef<ITrade>[]>(
		() => [
			{
				field: "ticker",
				headerName: "Ticker",
				flex: 1,
				cellRenderer: PairHoldingCell,
				cellRendererParams: (params: { data: ITrade }) => ({
					data: params?.data,
				}),
			},
			{
				field: "quantity",
				headerName: "Protift / Loss",
				flex: 1,
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
		rowData: trades.data,
		gridRef,
	};
}
