import { LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { randomUUID } from 'node:crypto'
import { Request } from 'express';
import {
  SerializedError,
  SerializedRequest,
  SerializedResponse,
} from 'pino-std-serializers';

export const loggerModuleAsyncParams: LoggerModuleAsyncParams = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): Params => {
    const currentEnv = configService.get('NODE_ENV')
    const isDev = currentEnv === 'development'
    const level = !isDev ? 'info' : 'debug'

    return {
      pinoHttp: {
        level,
        // Define a custom request id function
        genReqId: function (req, res) {
          const existingID = req.id ?? req.headers["x-request-id"]
          const id = existingID || randomUUID()
          req.headers["x-request-id"] = id as string
          res.setHeader('X-Request-Id', id as string)
          return id
        },

        // Define a custom logger level
        customLogLevel: function (_, res, err: any) {
          if (res.statusCode >= 400 || err) {
            return 'error'
          } else if (res.statusCode >= 300 && res.statusCode < 400) {
            return 'silent'
          }
          return 'info'
        },

        // Define a custom success message
        customSuccessMessage: function (req, res) {
          if (res.statusCode === 404) {
            return 'resource not found'
          }
          return `${req.method} ${req.url} completed`
        },

        // Define a custom receive message
        customReceivedMessage: function (req, res) {
          return `${req.method} ${req.url} received`
        },

        // Define a custom error message
        customErrorMessage: function (req, res, err: any) {
          const code = err?.response?.code ?? res.statusCode
          return `request errored with status code: ${code}`
        },
        serializers: {
          // 自定义请求日志
          req(_req: SerializedRequest) {
            const santizedReq = {
              id: _req.id || _req?.headers?.['x-request-id'],
              method: _req.method,
              url: _req.url,
              params: (_req.raw as Request).params,
              query: (_req.raw as Request).query,
              body: (_req.raw as Request).body,
              remoteAddress: _req.remoteAddress,
              remotePort: _req.remotePort
            };
            return santizedReq;
          },
          res(_res: SerializedResponse) {
            const santizedRes = {
              status: _res.statusCode,
            };
            return santizedRes;
          },
          // 自定义错误日志
          err(_err: SerializedError) {
            const santizedErr = {
              ..._err,
            };
            return santizedErr;
          },
        },
        transport: {
          target: 'pino-pretty',
          // 美化插件配置
          options:
            isDev
              ? {
                colorize: true, // 带颜色输出
                // 转换时间格式
                translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
              }
              : {
                colorize: false,
                translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                //  保存日志到文件
                destination: './log/combined.log',
                mkdir: true,
                singleLine: true,
              },
        },
      }
    };
  },
}

