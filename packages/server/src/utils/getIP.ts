import Hapi from "@hapi/hapi";

export const getIP = (request: Hapi.Request): string | undefined => {
  return (
    request.headers["x-real-ip"] ||
    request.headers["x-forwarded-for"] ||
    request.info.remoteAddress
  );
};
