import Hapi from "@hapi/hapi";

export const getIP = (request: Hapi.Request): string => {
  return (
    request.headers?.["x-real-ip"] ||
    request.headers?.["x-forwarded-for"] ||
    request.info.remoteAddress
  );
};
