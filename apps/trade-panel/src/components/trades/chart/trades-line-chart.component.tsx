"use client";

import * as echarts from "echarts";
import React, { useEffect, useRef, useState } from "react";

import { ILineChartProps } from "./trades-chart.types";

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
	}, [range, chartInstance, data]);

	useEffect(() => {
		const resizeChart = () => chartInstance?.resize();
		window.addEventListener("resize", resizeChart);
		return () => window.removeEventListener("resize", resizeChart);
	}, [chartInstance]);

	return <div ref={chartRef} style={{ width, height }} />;
}
