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
			{
				label: "Requirements",
				href: "https://docs.google.com/document/d/178QEdJkr-0l4P7IP-Iop3qMsLxZhJXLVqPoAo6CvSAA/edit?tab=t.0#heading=h.xoxnwnkjam3y",
				newWindow: true,
			},
			{
				label: "Docs",
				href: "https://github.com/rider-cantuaria-eng/stock-tracker/blob/develop/README.md",
				newWindow: true,
			},
			{
				label: "Github Repository",
				href: "https://github.com/rider-cantuaria-eng/stock-tracker/tree/develop",
				newWindow: true,
			},
		],
	},
];

export const socialLinks = [
	{ icon: FaGithub, href: "#" },
	{ icon: FaLinkedin, href: "#" },
];
