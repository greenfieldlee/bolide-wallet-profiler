import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Protocol } from './protocol.entity';

@Injectable()
export class ProtocolService {
  constructor(
    @InjectRepository(Protocol)
    private protocolRepository: Repository<Protocol>,
  ) {}

  // Fetches all protocols
  async findAll(): Promise<Protocol[]> {
    return await this.protocolRepository.find();
  }

  // Updates a protocol by id
  async update(
    id: any,
    updateProtocolDto: Partial<Protocol>,
  ): Promise<Protocol> {
    const protocol = await this.protocolRepository.findOne(id);

    if (!protocol) {
      throw new NotFoundException('Protocol not found');
    }

    return await this.protocolRepository.save({
      ...protocol,
      ...updateProtocolDto,
    });
  }
}
