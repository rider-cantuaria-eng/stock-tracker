import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle("Stock Tracker API")
    .setDescription(
      "API for managing portfolios and trades in the stock tracker application",
    )
    .setVersion("1.0")
    .addTag("portfolios", "Portfolio management endpoints")
    .addTag("trades", "Trade management endpoints")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen("3001");
  console.log("🚀 Stock Tracker API is running on http://localhost:3001");
  console.log(
    "📚 Swagger documentation available at http://localhost:3001/api",
  );
}

bootstrap();
