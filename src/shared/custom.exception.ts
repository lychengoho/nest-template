import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './transform.interceptor'

export class BussessException<T> extends HttpException {
  constructor(errMsg: ErrorResponse<T>) {
    super(errMsg, HttpStatus.OK);
  }
}
