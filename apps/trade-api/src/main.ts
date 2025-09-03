import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { PrismaExceptionFilter } from "./filters/prisma-exception.filters";
import { DTOValidationPipe } from "./pipes/dto-validation.pipe";
import { AllExceptionsFilter } from "./filters/all-exception.filters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global exception filter for all exceptions
  app.useGlobalFilters(new AllExceptionsFilter());

  // Apply global Prisma exception filter for database error handling (#security to avoid leaking database errors)
  app.useGlobalFilters(new PrismaExceptionFilter());

  // Configure global validation pipe (#requests validation)
  app.useGlobalPipes(new DTOValidationPipe());

  app.enableCors();

  await app.listen("3001");
}

bootstrap();
