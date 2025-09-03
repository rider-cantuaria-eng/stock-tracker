import { cn } from "@workspace/ui/lib/utils";
import { IoIosTrendingUp } from "react-icons/io";

import { NoSSR } from "../ui/no-ssr";
import { ICardInvestmentInfoProps } from "./types";

export function CardInvestmentInfo(props: ICardInvestmentInfoProps) {
	const { title, className, icon, value, increase } = props;

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

			<h4 className="flex items-center gap-[0.3rem] text-lg ">
				<NoSSR>
					{value?.toLocaleString("eu-US", {
						style: "currency",
						currency: "USD",
					})}
				</NoSSR>
				{increase && (
					<span className="flex items-center text-sm font-medium text-[#19A173] gap-[0.2rem]">
						+2% <IoIosTrendingUp />
					</span>
				)}
			</h4>
		</div>
	);
}
