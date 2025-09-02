import { cn } from "@workspace/ui/lib/utils";

import { navSections, socialLinks } from "./footer.const";
import { NavFooterList } from "./nav-footer.component";
import { FooterNewsletter } from "../../newslettter/newsletter.component";
import { FooterRedirectLinks } from "./redirect-links.component";

export function Footer() {
	return (
		<footer className="flex items-center justify-center pt-[3rem] pb-4  bg-background-secondary">
			<div className="flex flex-col  max-w-[1600px] w-full h-full">
				<span>LOGO</span>
				<div className={cn("grid !my-[2rem]", `grid-cols-${navSections.length + 1}`)}>
					<NavFooterList navSections={navSections} />
					<FooterNewsletter />
				</div>

				<FooterRedirectLinks socialLinks={socialLinks} />
			</div>
		</footer>
	);
}
