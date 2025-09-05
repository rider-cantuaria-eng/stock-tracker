"use client";

import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

import { ILineChartProps } from "../trades/chart/trades-chart.types";
import { lineChartOptions } from "./echart.helper";

export function TradesLineChart(props: ILineChartProps) {
	const { range = "1m", height = "100%", width = "100%", data = [] } = props;

	const chartRef = useRef<HTMLDivElement | null>(null);
	const [chartInstance, setChartInstance] = useState<echarts.EChartsType | null>(null);

	const getFilteredData = () => {
		return {
			labels: Array.from(data?.map(item => item.label) || []),
			data: Array.from(data?.map(item => item.value) || []),
		};
	};

	useEffect(() => {
		if (chartRef.current) {
			const myChart = echarts.init(chartRef.current);
			setChartInstance(myChart);
			return () => myChart.dispose();
		}
	}, []);

	useEffect(() => {
		if (chartInstance && data) {
			const filtered = getFilteredData();
			chartInstance.setOption(lineChartOptions(filtered));
			chartInstance.resize();
		}
	}, [range, chartInstance, data]);

	useEffect(() => {
		const resizeChart = () => chartInstance?.resize();
		window.addEventListener("resize", resizeChart);
		return () => window.removeEventListener("resize", resizeChart);
	}, [chartInstance]);

	return <div ref={chartRef} style={{ width, height }} />;
}
