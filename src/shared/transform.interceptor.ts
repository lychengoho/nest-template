import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
// 统一成功响应的数据结构
export interface SuccessResponse<T> {
  code: number;
  message: string;
  data: T;
}
 
// 统一错误响应的数据结构
export interface ErrorResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}
 
// 统一分页响应的数据结构
export interface PaginatedResponse<T> {
  code: number;
  message: string;
  data: T[];
  total: number;
}
 
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessResponse<T>> {
    return next.handle().pipe(
      map(data => ({
        code: 0, // 自定义成功响应的状态码
        message: 'success', // 自定义成功响应的消息
        data,
      })),
    );
  }
}
