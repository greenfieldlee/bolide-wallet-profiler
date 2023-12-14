import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PositionModule } from './position/position.module';
import { ProtocolModule } from './protocol/protocol.module';
import { AlternativeModule } from './alternative/alternative.module';
import { UserModule } from './user/user.module';

import { Position } from './position/position.entity';
import { Protocol } from './protocol/protocol.entity';
import { Alternative } from './alternative/alternative.entity';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Position, Protocol, Alternative, User],
        synchronize: configService.get('DB_SYNCHRONIZE'),
      }),
    }),
    PositionModule,
    ProtocolModule,
    AlternativeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
