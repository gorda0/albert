import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './modules/wash/wash.entity';
import { WashModule } from './modules/wash/wash.module';
const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    WashModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME,
      entities: [Wash],
      synchronize: !isProduction,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
