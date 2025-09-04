import { cn } from "@workspace/ui/lib/utils";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

import { NoSSR } from "../layout/no-ssr.component";

export interface ICardInvestmentInfoProps {
	title: string;
	icon?: React.ReactNode;
	value?: number;
	percentage?: {
		className?: string;
		value: number;
	};
	className?: string;
	isLoading?: boolean;
}

export function CardInvestmentInfo(props: ICardInvestmentInfoProps) {
	const {
		title,
		className,
		icon,
		value,
		percentage = {
			className: "",
			value: 0,
		},
		isLoading,
	} = props;

	return (
		<div
			className={cn(
				"flex flex-col overflow-hidden justify-between bg-background p-3 rounded-md h-[120px] shadow-md",
				className,
			)}
		>
			<span className="flex items-center gap-1 text-[#81818B]">
				{icon && icon}
				{title}
			</span>
			{isLoading ? (
				<div className="h-8 w-32 bg-foreground/20 rounded" />
			) : (
				<h4 className="flex items-center gap-[0.3rem] text-lg ">
					<NoSSR>
						{value?.toLocaleString("eu-US", {
							style: "currency",
							currency: "USD",
						})}
					</NoSSR>
					{percentage?.value > 0 && (
						<span className="flex items-center text-sm font-medium text-green-700 gap-[0.2rem]">
							{percentage?.value.toFixed(2).toLocaleString()} <IoIosTrendingUp />
						</span>
					)}
					{percentage?.value < 0 && (
						<span className="flex items-center text-sm font-medium text-red-700 gap-[0.2rem]">
							{percentage?.value.toFixed(2).toLocaleString()} <IoIosTrendingDown />
						</span>
					)}
				</h4>
			)}
		</div>
	);
}
