import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { forEach } from 'lodash'

import { AppModule } from '@modules/app/app.module';
import { grpcServiceOptions } from '@grpc/grpc-service-options'
import { TransformInterceptor } from '@shared/transform.interceptor'
import { AllExceptionFilter } from '@shared/all.exception.filter'
import { ValidationPipe } from '@shared/validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: false,
    bufferLogs: true
  });
  // 获取全局配置
  const configService = app.get(ConfigService);
  const port: number = configService.get('SERVER_PORT');

  app.disable('x-powered-by', 'X-Powered-By');

  // 注册全局logger
  const logger = app.get(Logger)
  app.useLogger(logger);

  // 注册全局拦截器
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new TransformInterceptor()
  );

  // 注册全局过滤器
  app.useGlobalFilters(
    new AllExceptionFilter()
  )

  // 注册全局参数校验管道
  app.useGlobalPipes(new ValidationPipe());

  // 设置所有 api 访问前缀
  app.setGlobalPrefix('/api');

  // 跨域配置
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // 创建grpc连接
  forEach(grpcServiceOptions, options => app.connectMicroservice<MicroserviceOptions>(options, { inheritAppConfig: true }))

  await app.startAllMicroservices();

  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
