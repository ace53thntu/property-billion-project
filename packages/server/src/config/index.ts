import Dotenv from "dotenv-safe";
import * as database from "./database";
import { server } from "./server";

Dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
  allowEmptyValues: true,
});

const constants = {
  EXPIRATION_PERIOD: {
    SHORT: "10m",
    MEDIUM: "4h",
    LONG: "730h",
  },
  AUTH_ATTEMPTS: {
    FOR_IP: 50,
    FOR_IP_AND_USER: 5,
  },
  API_TITLE: "Property API",
  AUTH_STRATEGIES: "API",
};

export const config = {
  server,
  database,
  constants,
  jwtSecret: process.env.JWT_SECRET,
  cors: {
    origin: ["*"],
    additionalHeaders: ["X-Access-Token", "X-Refresh-Token"],
    additionalExposedHeaders: ["X-Access-Token", "X-Refresh-Token"],
  },
};
