import { Module } from '@nestjs/common';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';

@Module({
  providers: [HeroService],
  controllers: [HeroController]
})
export class HeroModule {}
