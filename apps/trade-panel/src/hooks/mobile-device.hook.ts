import { useEffect, useState } from "react";

export function useMobileDevice() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 1200);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { isMobile };
}
