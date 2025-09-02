import "@workspace/ui/globals.css";
import { Header } from "@/src/components/layout/header/header.component";
import { ThemeProvider } from "@/src/core/context/theme.provider";
import { Metadata } from "next";
import { Golos_Text } from "next/font/google";

import { Footer } from "../components/layout/footer/footer.component";

const golosTextFonts = Golos_Text({
	variable: "--font-golos-text",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "📊 Stock Tracker",
	description:
		"Create portfolios, log trades, and view cumulative PnL over time with interactive charts.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${golosTextFonts.variable} antialiased`}>
				<ThemeProvider>
					<div className="flex flex-col h-full min-h-dvh">
						<div className="flex flex-col grow">
							{<Header />}
							<div className="flex justify-center items-center ">{children}</div>
							<Footer />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
