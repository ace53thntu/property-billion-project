import Dotenv from "dotenv-safe";

Dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
  allowEmptyValues: true,
});

export const Redis = {
  port: Number(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
};
