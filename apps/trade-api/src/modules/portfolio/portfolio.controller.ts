import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { Portfolio } from "@prisma/client";

import { PortfolioService } from "./portfolio.service";
import { PortfolioDto, UpdatePortfolioDto } from "./repository/dto";
import { ResponseDto } from "../response.dto";
import {
  PortfolioApiResponseDto,
  PortfolioListApiResponseDto,
} from "../swagger/dto";

@ApiTags("portfolios")
@Controller("portfolios")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new portfolio",
    description:
      "Creates a new investment portfolio with the provided name and initial value",
  })
  @ApiBody({ type: PortfolioDto })
  @ApiResponse({
    status: 201,
    description: "Portfolio created successfully",
    type: PortfolioApiResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Portfolio name already exists or invalid data",
  })
  create(@Body() portfolioData: PortfolioDto) {
    return this.portfolioService.create(portfolioData);
  }

  @Get()
  @ApiOperation({
    summary: "Get all portfolios",
    description: "Retrieves a list of all portfolios in the system",
  })
  @ApiResponse({
    status: 200,
    description: "Portfolios fetched successfully",
    type: PortfolioListApiResponseDto,
  })
  async findAll() {
    const portfolios = await this.portfolioService.findAll();

    const response = new ResponseDto<Portfolio[]>({
      message: "Portfolios fetched successfully",
      data: portfolios,
    });

    return response;
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get portfolio by ID",
    description: "Retrieves a specific portfolio by its unique identifier",
  })
  @ApiParam({
    name: "id",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Portfolio fetched successfully",
    type: PortfolioApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
  async findById(@Param("id") id: string) {
    const portfolio = await this.portfolioService.findById(id);

    const response = new ResponseDto<Portfolio>({
      message: `Portfolio '${portfolio.name}' fetched successfully`,
      data: portfolio,
    });

    return response;
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update portfolio",
    description: "Updates an existing portfolio with new data",
  })
  @ApiParam({
    name: "id",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiBody({ type: UpdatePortfolioDto })
  @ApiResponse({
    status: 200,
    description: "Portfolio updated successfully",
    type: PortfolioApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Portfolio name already exists or invalid data",
  })
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
  @ApiOperation({
    summary: "Delete portfolio",
    description: "Deletes a portfolio permanently from the system",
  })
  @ApiParam({
    name: "id",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Portfolio deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
  async delete(@Param("id") id: string) {
    const portfolio = await this.portfolioService.delete(id);

    const response = new ResponseDto<null>({
      message: `Portfolio '${portfolio.name}' deleted successfully`,
      data: null,
    });

    return response;
  }
}
