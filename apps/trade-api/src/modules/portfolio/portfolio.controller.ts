import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { Portfolio } from "@prisma/client";

import { PortfolioService } from "./portfolio.service";
import { PortfolioDto, UpdatePortfolioDto } from "./repository/dto";
import { ResponseDto } from "../response.dto";

@Controller("portfolios")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() portfolioData: PortfolioDto) {
    return this.portfolioService.create(portfolioData);
  }

  @Get()
  async findAll() {
    const portfolios = await this.portfolioService.findAll();

    const response = new ResponseDto<Portfolio[]>({
      message: "Portfolios fetched successfully",
      data: portfolios,
    });

    return response;
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const portfolio = await this.portfolioService.findById(id);

    const response = new ResponseDto<Portfolio>({
      message: `Portfolio '${portfolio.name}' fetched successfully`,
      data: portfolio,
    });

    return response;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() portfolioData: UpdatePortfolioDto,
  ) {
    const portfolio = await this.portfolioService.update(id, portfolioData);

    const response = new ResponseDto<Portfolio>({
      message: `Portfolio '${portfolio.name}' updated successfully`,
      data: portfolio,
    });

    return response;
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    const portfolio = await this.portfolioService.delete(id);

    const response = new ResponseDto<null>({
      message: `Portfolio '${portfolio.name}' deleted successfully`,
      data: null,
    });

    return response;
  }
}
