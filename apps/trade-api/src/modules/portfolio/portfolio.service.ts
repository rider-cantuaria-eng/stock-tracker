import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PortfolioRepository } from "./repository/portfolio.repository";
import { PortfolioDto } from "./repository/dto";
import { ServiceErrorException } from "src/exceptions/service-error.exception";

@Injectable()
export class PortfolioService {
  constructor(private readonly portfolioRepo: PortfolioRepository) {}

  async create(portfolioData: PortfolioDto) {
    try {
      const oldPortfolio = await this.portfolioRepo.findByName(
        portfolioData.name,
      );

      if (oldPortfolio) {
        throw new BadRequestException(
          `Portfolio '${oldPortfolio.name}' already exists`,
        );
      }

      const createdPortfolio = await this.portfolioRepo.create(portfolioData);

      console.debug("portfolio created on database...", createdPortfolio);

      return createdPortfolio;
    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new ServiceErrorException("Error creating portfolio");
    }
  }

  async findAll() {
    try {
      const portfolios = await this.portfolioRepo.findAll();

      console.debug("portfolios fetched on database...", portfolios);

      return portfolios;
    } catch (error) {
      console.error(error);
      throw new ServiceErrorException("Error fetching list of portfolios");
    }
  }

  async findPortfolioById(id: string) {
    const portfolio = await this.portfolioRepo.findById(id);

    if (!portfolio) {
      throw new NotFoundException(`Portfolio ${id} not found`);
    }

    console.debug("portfolio fetched on database...", portfolio);

    return portfolio;
  }

  async findById(id: string) {
    try {
      const portfolio = await this.findPortfolioById(id);

      console.debug("portfolio fetched on database...", portfolio);

      return portfolio;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(`Error fetching portfolio ${id}`);
    }
  }

  async update(id: string, portfolioData: PortfolioDto) {
    try {
      await this.findPortfolioById(id);

      const oldPortfolio = await this.portfolioRepo.findByName(
        portfolioData.name,
      );

      const hasAnotherWithSameName = oldPortfolio && oldPortfolio.id !== id;
      if (hasAnotherWithSameName) {
        throw new BadRequestException(
          `Portfolio '${oldPortfolio.name}' already exists, type another name`,
        );
      }

      const updatedPortfolio = await this.portfolioRepo.update(
        id,
        portfolioData,
      );

      console.debug("portfolio updated on database...", updatedPortfolio);

      return updatedPortfolio;
    } catch (error) {
      console.error(error);

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new ServiceErrorException(`Error updating portfolio ${id}`);
    }
  }

  async delete(id: string) {
    try {
      await this.findPortfolioById(id);

      const deletedPortfolio = await this.portfolioRepo.delete(id);

      console.debug("portfolio deleted on database...", deletedPortfolio);

      return deletedPortfolio;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(`Error deleting portfolio ${id}`);
    }
  }
}
