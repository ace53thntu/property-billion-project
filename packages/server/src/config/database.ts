import Path from "path";
import Dotenv from "dotenv-safe";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

Dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
  allowEmptyValues: true,
});

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const postgres: PostgresConnectionOptions = {
  type: "postgres",
  logging: true,
  synchronize: true,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  migrations: [Path.join(__dirname, "../migrations/*")],
  entities: [Path.join(__dirname, "../entities/*")],
};
