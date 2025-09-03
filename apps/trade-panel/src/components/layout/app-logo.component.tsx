"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

import { NoSSR } from "./no-ssr.component";

export interface ILogoProps {
	width: number;
	height: number;
}

export function AppLogo(props: ILogoProps) {
	const { width = 100, height = 100 } = props;

	const { theme } = useTheme();

	return (
		<NoSSR>
			<Image
				src={theme === "dark" ? "/images/dark-logo.png" : "/images/light-logo.png"}
				alt="Stock Tracker"
				width={width}
				height={height}
			/>
		</NoSSR>
	);
}
