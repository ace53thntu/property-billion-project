export const __prod__ = process.env.NODE_ENV === "production";

export const EXPIRATION_PERIOD = {
  SHORT: "10m",
  MEDIUM: "4h",
  LONG: "730h",
};
