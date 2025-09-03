import { usePortfolio, usePortfolios } from "@workspace/api-client/hooks";
import { useParams } from "next/navigation";

import { EmptyPortfolioModal } from "./empty-portfolio.modal";
import { NotFoundPortfolioModal } from "./not-found-portfolio.modal";
import { SelectPortfolioModal } from "./select-portfolio.modal";

export function WelcomePortfolioModal() {
	const { id } = useParams();
	const portfolio = usePortfolio(id as string);
	const portfolios = usePortfolios();

	const shouldHideModal = portfolio.data || portfolio.isLoading || portfolios.isLoading;
	if (shouldHideModal) {
		return null;
	}

	// If no portfolios are found, show the not found modal
	if (id) {
		return <NotFoundPortfolioModal />;
	}

	// If portfolios are found, show the select portfolio modal
	return portfolios.data?.length ? (
		<SelectPortfolioModal portfolios={portfolios.data} />
	) : (
		<EmptyPortfolioModal />
	);
}
