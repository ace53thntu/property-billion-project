export const constants = {
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

export const __prod__ = process.env.NODE_ENV === "production";
