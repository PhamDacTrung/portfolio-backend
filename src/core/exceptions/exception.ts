import { HttpException, HttpStatus } from '@nestjs/common';
import { IFetchDtoResponse } from 'src/common/http';

export class Exception extends HttpException {
  constructor(statusCode: HttpStatus, message: string, data?: unknown) {
    super(message, statusCode, data as object);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.BAD_REQUEST, message, data);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.UNAUTHORIZED, message, data);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.FORBIDDEN, message, data);
  }
}

export class NotFoundException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.NOT_FOUND, message, data);
  }
}

export class InternalServerError extends Exception {
  constructor(message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message);
  }
}

export class ExternalServiceException extends Exception {
  private static readonly defaultMessage = 'Error in external service';

  constructor(response: IFetchDtoResponse<unknown>) {
    super(
      response.statusCode,
      response.message || ExternalServiceException.defaultMessage,
    );
  }
}

export class ConflictException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.CONFLICT, message, data);
  }
}

export function handleErrorException(error: any) {
  if (error instanceof Exception) {
    throw error;
  }
  throw new InternalServerError(
    error instanceof Error ? error.message : 'Internal server error',
  );
}
