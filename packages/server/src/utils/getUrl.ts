import { Request } from "@hapi/hapi";

export const getUrl = (request: Request): string => {
  const protocol =
    request.headers["x-forwarded-proto"] || request.server.info.protocol;
  const host = request.headers["x-forwarded-host"] || request.info.host;
  const pathname = request.url.pathname;

  return `${protocol}://${host}${pathname}`;
};
