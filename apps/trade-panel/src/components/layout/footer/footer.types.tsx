import { IconType } from "react-icons/lib";

export interface ISocialLink {
	icon: IconType;
	href: string;
}

export interface IFooterLink {
	label: string;
	href: string;
	newWindow?: boolean;
}

export interface INavSection {
	title: string;
	items: Array<IFooterLink>;
}

export interface INavSectionListProps {
	navSections: INavSection[];
}

export interface IFooterSocialLinksProps {
	socialLinks: ISocialLink[];
}
