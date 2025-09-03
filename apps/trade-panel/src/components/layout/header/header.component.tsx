"use client";

import { useMobileDevice } from "@/src/hooks/mobile-device.hook";
import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { IoIosArrowDown } from "react-icons/io";

import { AppLogo } from "../app-logo.component";
import { NoSSR } from "../no-ssr.component";
import { HeaderMobile } from "./header-mobile.component";

export function Header() {
	const { theme, setTheme } = useTheme();
	const { isMobile } = useMobileDevice();

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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="darK:text-white font-medium text-md">
								Total value in 2.10983 BTC
								<IoIosArrowDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="start">
							<DropdownMenuLabel>My Portifolios</DropdownMenuLabel>
							<DropdownMenuGroup>
								<DropdownMenuItem>
									kucoin
									<DropdownMenuShortcut>2.10983 BTC</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									bybit
									<DropdownMenuShortcut>2.10983 BTC</DropdownMenuShortcut>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								Log out
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

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
