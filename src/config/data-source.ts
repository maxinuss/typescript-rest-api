import { join } from "path";
import { DataSource } from "typeorm";
import * as path from "path";
import * as dotenv from "dotenv";

const dotenvPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: dotenvPath });
if (result.error) { /* do nothing */ }

export const AppDataSource = new DataSource({
  type: 'postgres' as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrationsTableName: 'migration',
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  ssl: false,
});
