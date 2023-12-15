import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino';
import { configModuleOptions } from '@configuration/config';
import { loggerModuleAsyncParams } from '@configuration/logger';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),  // Load .env file
    LoggerModule.forRootAsync(loggerModuleAsyncParams),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
