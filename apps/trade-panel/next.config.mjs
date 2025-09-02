import { url } from "inspector";

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["@workspace/ui"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
			},
		],
	},
};

export default nextConfig;
