import Boom from "@hapi/boom";
import { isQueryFailedError } from "./catchPgError";
import { PG_NOT_NULL_VIOLATION, PG_UNIQUE_VIOLATION } from "./pgCode";

export const getErrorColumnName = (
  errorMessage: any,
  firstMatch: string,
  secondMatch: string
): string => {
  const start = parseInt(errorMessage.indexOf(firstMatch), 10);
  const restart = parseInt(
    errorMessage.substring(start + 1).indexOf(secondMatch),
    10
  );
  return errorMessage.substring(start + 1, start + restart + 1);
};

export const getErrorMessage = (
  errorMessage: any,
  firstMatch: string,
  secondMatch: string
): string => {
  const column = getErrorColumnName(errorMessage, firstMatch, secondMatch);
  return `"${column}"${errorMessage.split("=")?.[1]?.split(")")?.[1]}`;
};

export const errorHandler = (error: any) => {
  if (isQueryFailedError(error)) {
    if (error?.code === PG_UNIQUE_VIOLATION) {
      const column = getErrorColumnName(error?.detail ?? "", "(", ")");

      const err = Boom.conflict(`"${column}" already exists.`, {
        source: "payload",
        keys: [column],
      });
      err.reformat();
      err.output.payload.validation = err.data;
      throw err;
    }

    if (error?.code === PG_NOT_NULL_VIOLATION) {
      const column = getErrorColumnName(error?.message ?? "", '"', '"');
      const err = Boom.badData(`"${column}" must not null.`, {
        source: "payload",
        keys: [column],
      });
      err.reformat();
      err.output.payload.validation = err.data;
      throw err;
    }

    return Boom.badRequest();
  }
  return Boom.badImplementation();
};
