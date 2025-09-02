"use client";

import "@workspace/ui/globals.css";
import { Header } from "@/src/components/layout/header/header.component";
import { ThemeProvider } from "@/src/core/context/theme.provider";
import { Golos_Text } from "next/font/google";
import { useEffect, useState } from "react";

import { Footer } from "../components/layout/footer/footer.component";
import { HeaderMobile } from "../components/layout/header/header-mobile.component";

const golosTextFonts = Golos_Text({
	variable: "--font-golos-text",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 1200);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${golosTextFonts.variable} antialiased`}>
				<ThemeProvider>
					<div className="flex flex-col h-full min-h-dvh">
						<div className="flex flex-col grow">
							{isMobile ? <HeaderMobile /> : <Header />}
							<div className="flex justify-center items-center ">{children}</div>
							<Footer />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
