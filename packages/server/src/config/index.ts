import Dotenv from "dotenv-safe";
import * as database from "./database";
import { server } from "./server";
import { constants } from "./constants";

Dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
  allowEmptyValues: true,
});

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
