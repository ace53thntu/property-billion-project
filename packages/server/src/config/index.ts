import Dotenv from "dotenv-safe";
import * as database from "./database";
import { server } from "./server";
import { Constants } from "./constants";
import { Redis } from "./redis";

Dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env",
  allowEmptyValues: true,
});

export const Config = {
  server,
  database,
  constants: Constants,
  jwtSecret: process.env.JWT_SECRET,
  cors: {
    origin: ["*"],
    additionalHeaders: ["X-Access-Token", "X-Refresh-Token"],
    additionalExposedHeaders: ["X-Access-Token", "X-Refresh-Token"],
  },
  redis: Redis,
  rateLimit: {
    keyPrefix: "@app/property-rateLimit",
    points: 10,
    duration: 1,
    blockDuration: 60 * 30,
  },
};
