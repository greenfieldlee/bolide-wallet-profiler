import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Protocol } from './protocol.entity';
import { ProtocolService } from './protocol.service';
import { ProtocolController } from './protocol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Protocol])],
  providers: [ProtocolService],
  controllers: [ProtocolController],
})
export class ProtocolModule {}
