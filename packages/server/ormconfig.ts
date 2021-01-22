import { ConnectionOptions } from "typeorm";
import path from "path";

export default {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  migrations: [path.join(__dirname, "./src/migrations/*.{ts,js}")],
  entities: [path.join(__dirname, "./src/entities/*.{ts,js}")],
  synchronize: true,
  cli: {
    migrationsDir: "./src/migrations",
    entitiesDir: "./src/entities",
  },
} as ConnectionOptions;
