import { BadRequestException, ValidationPipe } from "@nestjs/common";

export class DTOValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true, // Strip properties that do not have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
      exceptionFactory: (errors) => {
        console.error("Failed to validate inputs: ", errors);

        // Get all input errors from the request, to easily manage the input errors on API response
        const inputs = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          message: "Bad request",
          inputs,
        });
      },
    });
  }
}
