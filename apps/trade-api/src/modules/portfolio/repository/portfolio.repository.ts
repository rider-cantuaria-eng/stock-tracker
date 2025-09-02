import { Injectable } from "@nestjs/common";
import { PrismaClient, Portfolio } from "@prisma/client";
import { PortfolioDto } from "./dto";

const prisma = new PrismaClient();

@Injectable()
export class PortfolioRepository {
  async create(data: PortfolioDto): Promise<Portfolio> {
    console.debug("creating portfolio on database...", data);
    return prisma.portfolio.create({
      data,
    });
  }

  async findAll(): Promise<Portfolio[]> {
    console.debug("finding all portfolios on database...");
    return prisma.portfolio.findMany();
  }

  async findById(id: string): Promise<Portfolio | null> {
    console.debug("finding portfolio on database...", id);
    return prisma.portfolio.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<Portfolio | null> {
    console.debug("finding portfolio on database by name...", name);
    return prisma.portfolio.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });
  }

  async update(id: string, data: Partial<Portfolio>): Promise<Portfolio> {
    console.debug("updating portfolio on database...", id);
    return prisma.portfolio.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<Portfolio> {
    console.debug("deleting portfolio on database...", id);
    return prisma.portfolio.delete({
      where: { id },
    });
  }
}
