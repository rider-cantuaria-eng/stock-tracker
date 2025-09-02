import { InternalServerErrorException } from "@nestjs/common";

export class ServiceErrorException extends InternalServerErrorException {
  constructor(message: string) {
    super({
      message,
      error: "Server error",
    });
  }
}
