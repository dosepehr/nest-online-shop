import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError & { code?: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'ER_DUP_ENTRY') {
      return response.status(409).json({
        status: false,
        message: 'Duplicate entry: this mobile number is already in use',
      });
    }

    return response.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
}
