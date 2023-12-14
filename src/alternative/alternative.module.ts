import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alternative } from './alternative.entity';
import { AlternativeService } from './alternative.service';
import { AlternativeController } from './alternative.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Alternative])],
  providers: [AlternativeService],
  controllers: [AlternativeController],
})
export class AlternativeModule {}
