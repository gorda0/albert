import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './wash.entity';
import { WashService } from './wash.service';
import { WashController } from './wash.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wash])],
  providers: [WashService],
  controllers: [WashController],
})
export class WashModule {}
