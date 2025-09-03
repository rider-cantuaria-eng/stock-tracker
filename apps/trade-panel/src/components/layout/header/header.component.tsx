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

import { NoSSR } from "../../ui/no-ssr";
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
					<span className="flex items-center text-foreground-secondary">LOGO</span>

					<div className="bg-[#4C4D52] w-[1px] h-[50px] mx-[1.5rem]"></div>

					<ul className="flex gap-4 h-full">
						<li className="relative flex justify-center items-center h-full px-[1rem] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500">
							<a href="#" className="text-blue-500">
								Portfolios
							</a>
						</li>
						<li className="flex justify-center items-center h-full px-[1rem]">
							<a href="#" className="text-foreground-secondary">
								Docs
							</a>
						</li>
					</ul>
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
