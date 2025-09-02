import { CardInvestmentInfo } from "@/src/components/card-investment-info";
import { Button } from "@workspace/ui/components/button";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { IoWalletOutline } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";

import { ModalCreatePortoflio } from "../modal/create-portfolio.modal";

export function PortfolioSummary() {
	return (
		<section className="!w-full h-fit bg-background-secondary rounded-md p-7 mb-[1.5rem]">
			<div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
				<div>
					<h2 className="text-xl font-medium">Portfolio</h2>
					<span className="text-[#81818B] text-sm">Update 02/16/2022 at 02:30 PM</span>
				</div>
				<div className="flex gap-[0.5rem] mt-4 lg:mt-0">
					<Button variant="outline" size="lg">
						<RiEdit2Line />
						Edit
					</Button>
					<ModalCreatePortoflio />
				</div>
			</div>

			<div className="flex flex-col items-start  2xl:flex-row  justify-between gap-4 mt-[3rem]">
				<div>
					<span className="flex items-center gap-2 text-[#81818B]">
						<IoWalletOutline />
						Available Balance
					</span>
					<div className="flex items-center mt-4 gap-[3rem]">
						<h3 className="text-3xl">$32,455.12</h3>
						<Button size="sm" className="!bg-background !text-[#81818B]">
							Hide price <FaRegEyeSlash />
						</Button>
					</div>
				</div>

				<div className="grid grid-cols-1  md:grid-cols-3 2xl:grid-cols-3 w-full lg:max-w-[800px] gap-[2rem] ">
					<CardInvestmentInfo
						title="Total Investment"
						icon={<IoWalletOutline />}
						value={3045512}
					/>
					<CardInvestmentInfo
						title="Total Return"
						icon={<IoWalletOutline />}
						value={30455}
					/>
					<CardInvestmentInfo
						title="Total Investment"
						icon={<IoMdTime />}
						value={3045512}
						increase={{
							value: "0.2%",
						}}
					/>
				</div>
			</div>
		</section>
	);
}
