import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config'

const currentEnv = process.env.NODE_ENV || 'development';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: [`env/.env.${currentEnv}`],
  expandVariables: true, // 开启嵌套变量
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'testing', 'stage', 'local')
      .default('development'),
    GRPC_PORT: Joi.number().default(50053),
    SERVER_PORT: Joi.number().default(3000),
  }),
  validationOptions: {
    abortEarly: true, // 如果为true，在遇到第一个错误时就停止验证；如果为false，返回所有错误。默认为false。
  },
}
