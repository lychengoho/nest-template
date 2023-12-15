import { ClientOptions, Transport } from '@nestjs/microservices';
import { resolveClientProtoPath } from '@utils/paths'

// import { ConfigService } from '@nestjs/config'
// const configService = new ConfigService();

export const testGrpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'http://localhost:50053',
    package: 'hero',
    protoPath: resolveClientProtoPath('hero'),
    // loader: {
    //   enums: String,
    //   objects: true,
    //   arrays: true
    // }
  },
}
