import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from '@configuration/config';
import { loggerModuleAsyncParams } from '@configuration/logger';
import { typeOrmModuleAsyncOptions } from '@configuration/database';
import { HeroModule } from '@modules/hero/hero.module'

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),  // Load .env file
    LoggerModule.forRootAsync(loggerModuleAsyncParams),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),

    HeroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
