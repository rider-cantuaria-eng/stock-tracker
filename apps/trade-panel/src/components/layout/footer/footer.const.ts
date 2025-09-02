import { FaGithub, FaLinkedin } from "react-icons/fa";

import { INavSection } from "./footer.types";

export const navSections: INavSection[] = [
	{
		title: "Tech Stack Frontend",
		items: [
			{ label: "NextJs", href: "https://nextjs.org", newWindow: true },
			{ label: "TypeScript", href: "https://www.typescriptlang.org", newWindow: true },
			{ label: "TailwindCSS", href: "https://tailwindcss.com", newWindow: true },
			{ label: "ShadCN UI", href: "https://ui.shadcn.com", newWindow: true },
			{ label: "AG Grid", href: "https://www.ag-grid.com", newWindow: true },
			{ label: "Apache ECharts", href: "https://echarts.apache.org", newWindow: true },
		],
	},
	{
		title: "Tech Stack Backend",
		items: [
			{ label: "NestJs", href: "https://nestjs.com", newWindow: true },
			{ label: "NodeJs", href: "https://nodejs.org", newWindow: true },
			{ label: "PostgreSQL", href: "https://www.postgresql.org", newWindow: true },
			{ label: "Prisma", href: "https://www.prisma.io", newWindow: true },
		],
	},
	{
		title: "Resources",
		items: [
			{ label: "Requirements", href: "#", newWindow: true },
			{ label: "Docs", href: "#" },
			{ label: "Github Repository", href: "#", newWindow: true },
		],
	},
];

export const socialLinks = [
	{ icon: FaGithub, href: "#" },
	{ icon: FaLinkedin, href: "#" },
];
