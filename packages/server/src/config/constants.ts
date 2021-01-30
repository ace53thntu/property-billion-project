export const Constants = {
  EXPIRATION_PERIOD: {
    SHORT: "10m",
    MEDIUM: "4h",
    LONG: "730h",
  },
  AUTH_ATTEMPTS: {
    FOR_IP: 50,
    FOR_IP_AND_USER: 5,
  },
  LOCKOUT_PERIOD: 30, // in units of minutes
  API_TITLE: "Property API",
  AUTH_STRATEGIES: "API",
  PAGINATION: {
    DEFAULT_LIMIT: 10,
    DEFAULT_PAGE: 1,
  },
};

export const __prod__ = process.env.NODE_ENV === "production";
