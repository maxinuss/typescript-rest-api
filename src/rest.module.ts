import { Module } from "@nestjs/common";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HealthModule } from "./modules/health/health.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductModule } from "./modules/product/product.module";
import { Category } from "./modules/category/category.entity";
import { Product } from "./modules/product/product.entity";

console.log(join(__dirname, '/src/**/*.entity.{ts, js}'));
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
        entities: [Category, Product],

        ssl: false,
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    CategoryModule,
    ProductModule,
  ],
})

export class RestModule {}
