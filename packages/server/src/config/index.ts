import Dotenv from "dotenv-safe";
import * as database from "./database";
import { server } from "./server";
import { Constants } from "./constants";

Dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
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
};
