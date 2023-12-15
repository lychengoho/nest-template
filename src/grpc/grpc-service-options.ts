import { ClientOptions, GrpcService, Transport } from '@nestjs/microservices';
import { resolveServiceProtoPath } from '@utils/paths'

export const testGrpcServiceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: resolveServiceProtoPath('hero'),
    // loader: {
    //   enums: String,
    //   objects: true,
    //   arrays: true
    // }
  },
}

/**
 * 导出所有grpc配置
 */
export const grpcServiceOptions: ClientOptions[] = [
  testGrpcServiceOptions
]
