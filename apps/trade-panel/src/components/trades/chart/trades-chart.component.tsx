"use client";

import { useTradeReport } from "@workspace/api-client/hooks";
import { TTradePeriodType } from "@workspace/api-client/types";
import { Button } from "@workspace/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RxExitFullScreen } from "react-icons/rx";

import { TradesChartSkeleton } from "./trades-chart.skeleton";
import { RangeType } from "./trades-chart.types";
import { TradesLineChart } from "./trades-line-chart.component";

export function TradesChart() {
	const [range, setRange] = useState<RangeType>("7d");
	const { id: portfolioId } = useParams();
	const report = useTradeReport(portfolioId as string, range as TTradePeriodType);

	return (
		<section className="relative !w-full h-fit bg-background-secondary rounded-md p-7 mb-[1.5rem]">
			<Tabs defaultValue="7d" className="w-[400px]">
				<TabsList className="bg-background">
					<TabsTrigger
						value="7d"
						onClick={() => setRange("7d")}
						className="cursor-pointer"
					>
						7D
					</TabsTrigger>
					<TabsTrigger
						value="15d"
						onClick={() => setRange("15d")}
						className="cursor-pointer"
					>
						15D
					</TabsTrigger>
					<TabsTrigger
						value="30d"
						onClick={() => setRange("1m")}
						className="cursor-pointer"
					>
						1M
					</TabsTrigger>
					<TabsTrigger
						value="180d"
						onClick={() => setRange("6m")}
						className="cursor-pointer"
					>
						6M
					</TabsTrigger>
					<TabsTrigger
						value="365d"
						onClick={() => setRange("1y")}
						className="cursor-pointer"
					>
						1Y
					</TabsTrigger>
					<TabsTrigger
						value="all"
						onClick={() => setRange("all")}
						className="cursor-pointer"
					>
						All
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{report?.isLoading ? (
				<TradesChartSkeleton />
			) : (
				<TradesLineChart range={range as RangeType} height="400px" data={report?.data} />
			)}

			<Dialog>
				<DialogTrigger asChild>
					<Button className="absolute right-[10px] bottom-[10px] !bg-background">
						<RxExitFullScreen className="text-foreground-secondary" />
					</Button>
				</DialogTrigger>
				<DialogContent className="!max-w-full !w-full  !h-full bg-background-secondary">
					<DialogHeader className="!hidden">
						<DialogTitle className="!hidden"></DialogTitle>
					</DialogHeader>
					<div>
						<TradesLineChart range={range as RangeType} data={report?.data} />
					</div>
				</DialogContent>
			</Dialog>
		</section>
	);
}
