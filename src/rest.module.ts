import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthModule } from "./modules/health/health.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CategoryModule } from "./modules/category/category.module";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as any,
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        migrationsTableName: 'migration',
        migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
        entities: [join(__dirname, '../src/**/*.entity.{ts}')],

        ssl: false,
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    CategoryModule,
  ],
})

export class RestModule {}
