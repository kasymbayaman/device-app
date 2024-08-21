import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: configService.get('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: 'postgres',
        entities: [join(__dirname, '../', '**/*.entity{.ts,.js}')],
        migrations: [join(__dirname, '../', 'database/migrations/**/*.ts')],
        synchronize: process.env.NODE_ENV !== 'production', // migrations are out of scope
        namingStrategy: new SnakeNamingStrategy(),
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [],
})
export class DatabaseModule {}
