import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export const lineChartOptions = (filtered: {
	labels: string[];
	data: number[];
}): EChartsOption => ({
	backgroundColor: "transparent",
	grid: {
		left: "3%",
		right: "4%",
		bottom: "3%",
		containLabel: true,
	},
	xAxis: {
		type: "category",
		data: filtered.labels,
		boundaryGap: false,
		axisLine: {
			lineStyle: {
				color: "#e5e7eb",
			},
		},
		axisLabel: {
			color: "#6b7280",
			fontSize: 12,
		},
	},
	yAxis: {
		type: "value",
		axisLine: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		axisLabel: {
			color: "#6b7280",
			fontSize: 12,
			formatter: (value: number) => {
				return value >= 0 ? `+$${value.toFixed(2)}` : `-$${Math.abs(value).toFixed(2)}`;
			},
		},
		splitLine: {
			lineStyle: {
				color: "#f3f4f6",
				type: "dashed",
			},
		},
	},
	series: [
		{
			data: filtered.data,
			type: "line",
			smooth: true,
			lineStyle: {
				width: 3,
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
					{ offset: 0, color: "#10b981" },
					{ offset: 1, color: "#3b82f6" },
				]),
			},
			areaStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
					{ offset: 0, color: "rgba(16, 185, 129, 0.3)" },
					{ offset: 1, color: "rgba(59, 130, 246, 0.1)" },
				]),
			},
			symbol: "circle",
			symbolSize: 6,
			itemStyle: {
				color: "#ffffff",
				borderColor: "#10b981",
				borderWidth: 2,
			},
			emphasis: {
				itemStyle: {
					color: "#10b981",
					borderColor: "#ffffff",
					borderWidth: 3,
					shadowBlur: 10,
					shadowColor: "rgba(16, 185, 129, 0.5)",
				},
			},
		},
	],
	tooltip: {
		trigger: "axis",
		backgroundColor: "rgba(0, 0, 0, 0.8)",
		borderColor: "#10b981",
		borderWidth: 1,
		textStyle: {
			color: "#ffffff",
		},
		formatter: (params: echarts.TooltipComponentFormatterCallbackParams) => {
			const firstParam = Array.isArray(params) ? params[0] : params;
			const value = (firstParam as { value?: number })?.value || 0;
			const label = (firstParam as { axisValue?: string })?.axisValue || "";
			return `
				<div style="padding: 8px;">
					<div style="font-weight: bold; margin-bottom: 4px;">${label}</div>
					<div style="color: ${value >= 0 ? "#10b981" : "#ef4444"};">
						${value >= 0 ? "📈" : "📉"} ${value >= 0 ? "+" : ""}$${value.toFixed(2)}
					</div>
				</div>
			`;
		},
	},
	animation: true,
	animationDuration: 1000,
	animationEasing: "cubicOut",
});
