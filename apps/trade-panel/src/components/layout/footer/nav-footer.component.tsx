import { INavSectionListProps } from "./footer.types";

export function NavFooterList({ navSections }: INavSectionListProps) {
	return navSections?.map((navSections, index) => (
		<nav key={index}>
			<h3 className="text-lg font-medium mb-4">{navSections?.title}</h3>
			<ul>
				{navSections?.items?.map((items, index) => (
					<li className="mt-4" key={index}>
						<a href={items.href} className=" text-[#81818B]">
							{items.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	));
}
