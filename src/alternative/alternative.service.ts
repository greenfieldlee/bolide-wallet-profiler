import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alternative } from './alternative.entity';

@Injectable()
export class AlternativeService {
  constructor(
    @InjectRepository(Alternative)
    private alternativeRepository: Repository<Alternative>,
  ) {}

  async findAll(position: string): Promise<Alternative[]> {
    const alternatives = await this.alternativeRepository.find({
      where: { position },
    });

    if (!alternatives) {
      throw new NotFoundException('No alternatives found for this position');
    }

    return alternatives;
  }

  async removeById(id: any): Promise<void> {
    const alternative = await this.alternativeRepository.findOne(id);

    if (!alternative) {
      throw new NotFoundException('Alternative not found');
    }

    await this.alternativeRepository.delete(id);
  }

  async removeByPosition(position: string): Promise<void> {
    const alternatives = await this.alternativeRepository.find({
      where: { position },
    });

    if (!alternatives) {
      throw new NotFoundException('No alternatives found for this position');
    }

    await this.alternativeRepository.delete({ position });
  }

  async create(alternative: Alternative): Promise<Alternative> {
    return await this.alternativeRepository.save(alternative);
  }
}
