"use client";

import { useMobileDevice } from "@/src/hooks/mobile-device.hook";
import { usePortfolio, usePortfolios } from "@workspace/api-client/hooks";
import { Button } from "@workspace/ui/components/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";

import { AppLogo } from "../app-logo.component";
import { NoSSR } from "../no-ssr.component";
import { DropdownPortfolio } from "../portfolio-dropdown.component";
import { HeaderMobile } from "./header-mobile.component";

export function Header() {
	const { theme, setTheme } = useTheme();
	const { isMobile } = useMobileDevice();

	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string)?.data;
	const portfolios = usePortfolios();

	if (isMobile) {
		return <HeaderMobile />;
	}

	return (
		<header className="flex items-center justify-center px-4 h-[98px] bg-background-secondary border-b-1 border-b-border-secondary">
			<div className="flex justify-between max-w-[1600px] w-full h-full">
				<nav className="flex items-center gap-4 h">
					<AppLogo width={150} height={39} />

					<div className="bg-[#4C4D52] w-[1px] h-[50px] mx-[1.5rem]"></div>
				</nav>

				<div className="flex items-center">
					<b>Portfolio</b>:
					<DropdownPortfolio
						title={`${portfolio?.name} • $${portfolio?.initialValue.toLocaleString()}`}
						portfolios={portfolios?.data ?? []}
					/>
					<NoSSR>
						<Button
							variant="outline"
							onClick={() => {
								if (theme === "dark") setTheme("light");
								if (theme === "light") setTheme("dark");
							}}
							size="icon"
						>
							{theme === "dark" ? (
								<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:-rotate-90" />
							) : (
								<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
							)}
						</Button>
					</NoSSR>
				</div>
			</div>
		</header>
	);
}
