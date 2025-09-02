import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const { message, error, inputs } = exception.getResponse() as {
        message: string;
        error: string;
        inputs: Record<string, string>;
      };

      const status = exception.getStatus();
      return response.status(status).json({
        message,
        error,
        inputs,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: "Server error",
    });
  }
}
