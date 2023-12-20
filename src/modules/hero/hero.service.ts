import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hero } from './hero.entity';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(Hero)
    private repository: Repository<Hero>,
  ) { }

  async findAll(): Promise<Hero[]> {
    return await this.repository.find();
  }

  async add(hero: Hero): Promise<void> {
    await this.repository.insert(hero);
  }
}
