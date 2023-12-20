import { Controller, Get, Post, Body } from '@nestjs/common';
import { HeroService } from './hero.service'
import { Hero } from './hero.entity';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) { }

  @Post('/hello')
  getHello(): Promise<Hero[]> {
    return this.heroService.findAll();
  }

  @Post('/add')
  add(@Body() hero: Hero): Promise<any> {
    console.log(hero)
    return this.heroService.add(hero);
  }
}
