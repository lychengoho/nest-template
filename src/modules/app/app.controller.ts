import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/test-post')
  getHello1(@Body() data: any): any {
    return this.appService.getHello1(data);
  }
}
