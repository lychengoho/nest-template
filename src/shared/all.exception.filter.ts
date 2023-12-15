import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { ErrorResponse } from './transform.interceptor'

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.catchHttpException(exception, host);
    }
    if (exception instanceof RpcException) {
      return this.catchRpcException(exception, host);
    }
    if (exception instanceof Error) {
      return this.catchError(exception, host);
    }
  }

  catchError(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        code: -1,
        message: 'System Error!',
        data: null
      })
  }

  catchRpcException(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errMsg = exception.getError()
    const code = (errMsg as ErrorResponse)?.code ?? HttpStatus.INTERNAL_SERVER_ERROR
    const message = (errMsg as ErrorResponse)?.message ?? errMsg
    const data = (errMsg as ErrorResponse)?.data ?? null

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        code,
        message,
        data
      });
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errMsg = exception.getResponse();
    const code = (errMsg as ErrorResponse)?.code ?? status
    const message = (errMsg as ErrorResponse)?.message ?? errMsg
    const data = (errMsg as ErrorResponse)?.data ?? null

    response
      .status(status)
      .json({
        code,
        message,
        data
      });
  }
}
