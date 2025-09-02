import { ISocialLink } from "./footer.types";

export interface IFooterRedirectLinksProps {
	socialLinks: ISocialLink[];
}

export function FooterRedirectLinks({ socialLinks }: IFooterRedirectLinksProps) {
	return (
		<div className="flex justify-between items-center border-t-1 border-t-border-secondary pt-8 pb-4">
			<div className="flex items-center">
				<span className="text-sm text-[#81818B]">@2025 Stock Tracker</span>
			</div>
			<ul className="flex items-center gap-6">
				{socialLinks?.map(({ icon: Icon, href }, index) => (
					<li key={index}>
						<a href={href}>
							<Icon />
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
