import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { BussessException } from '@shared/custom.exception'
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): any {
    throw new BussessException({
      code: 20001,
      message: '未登录',
      data: {
        a: 1,
        b: 2
      }
    });
    return 'Hello World!';
  }

  getHello1(data: any): any {
    return data
  }
}
