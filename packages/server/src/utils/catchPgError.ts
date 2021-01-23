import { QueryFailedError } from "typeorm";

export const isQueryFailedError = (err: Error): boolean =>
  err instanceof QueryFailedError;
