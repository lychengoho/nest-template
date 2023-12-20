import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './hero.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hero])],
  providers: [HeroService],
  controllers: [HeroController],
  exports: [HeroService],
})
export class HeroModule {}
