import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './position.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private userPositionRepository: Repository<Position>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(walletAddress: string): Promise<Position[]> {
    const user = await this.userRepository.findOne({
      where: { walletAddress },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userPositionRepository.find({ where: { user: user } });
  }

  async remove(walletAddress: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { walletAddress },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await this.userPositionRepository.delete({ user: user });
  }

  async create(userPosition: Position): Promise<Position> {
    return await this.userPositionRepository.save(userPosition);
  }
}
