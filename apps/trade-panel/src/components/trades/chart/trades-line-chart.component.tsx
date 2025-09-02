"use client";

import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

import { LineChartProps } from "./trades-chart.types";

// Dados fictícios para 365 dias
const generateDummyData = (days: number) => {
	const data: number[] = [];
	const labels: string[] = [];
	const today = new Date();
	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
		data.push(Math.floor(Math.random() * 1000) + 500);
	}
	return { labels, data };
};

export function TradesLineChart({ range = "1m" }: LineChartProps) {
	const chartRef = useRef<HTMLDivElement | null>(null);
	const [chartInstance, setChartInstance] = useState<echarts.EChartsType | null>(null);

	// Dados completos de 365 dias
	const fullData = generateDummyData(365);

	const getFilteredData = () => {
		let days: number;

		switch (range) {
			case "7d":
				days = 7;
				break;
			case "15d":
				days = 15;
				break;
			case "1m":
				days = 30;
				break;
			case "6m":
				days = 180;
				break;
			case "1y":
				days = 365;
				break;
			case "all":
				days = fullData.data.length;
				break;
			default:
				days = 30;
		}

		return {
			labels: fullData.labels.slice(-days),
			data: fullData.data.slice(-days),
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
		if (chartInstance) {
			const filtered = getFilteredData();
			chartInstance.setOption({
				xAxis: {
					type: "category",
					data: filtered.labels,
					boundaryGap: false,
				},
				yAxis: { type: "value" },
				series: [{ data: filtered.data, type: "line", smooth: true }],
				tooltip: { trigger: "axis" },
			});
			chartInstance.resize();
		}
	}, [range, chartInstance]);

	useEffect(() => {
		const resizeChart = () => chartInstance?.resize();
		window.addEventListener("resize", resizeChart);
		return () => window.removeEventListener("resize", resizeChart);
	}, [chartInstance]);

	return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
}
