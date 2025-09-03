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
	// Enable standalone output for Docker
	output: "standalone",
	// Experimental features for better performance
	experimental: {
		outputFileTracingRoot: process.cwd(),
	},
};

export default nextConfig;
