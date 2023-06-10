import { Module } from '@nestjs/common';
import { CapsulesModule } from './capsules/capsules.module';
import { RocketsModule } from './rockets/rockets.module';
import { LaunchModule } from './launches/launch.module';
import { PayloadModule } from './payloads/payload.module';
import { LaunchpadsModule } from './launchpads/launchpads.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import CoresModule from './cores/cores.module';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        ssl: {
          ca: readFileSync(`../../../../../../../../${process.env.MYSQL_ATTR_SSL_CA}`)
        },
      },
    }),
    CapsulesModule,
    RocketsModule,
    CoresModule,
    LaunchModule,
    PayloadModule,
    LaunchpadsModule,
  ],
})

export class MainModule {}
