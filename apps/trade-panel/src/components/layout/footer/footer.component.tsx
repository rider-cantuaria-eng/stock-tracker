import { AppLogo } from "../app-logo.component";
import { navSections, socialLinks } from "./footer.const";
import { FooterSocialLinks } from "./fotter-social-links.component";
import { NavFooterList } from "./nav-footer.component";

export function Footer() {
	return (
		<footer className="flex items-center justify-center pt-[3rem] pb-4  bg-background-secondary">
			<div className="flex flex-col  max-w-[1600px] w-full h-full px-12">
				<AppLogo width={100} height={26} />
				<div className="grid py-12 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
					<NavFooterList navSections={navSections} />
				</div>

				<FooterSocialLinks socialLinks={socialLinks} />
			</div>
		</footer>
	);
}
