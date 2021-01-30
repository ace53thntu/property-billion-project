import Hapi from "@hapi/hapi";
import Redis from "redis";
import Boom, { Boom as BoomType } from "@hapi/boom";
import { RateLimiterRedis, RateLimiterRes } from "rate-limiter-flexible";
import { Config } from "@config/index";

const rateLimitPlugin: Hapi.Plugin<null> = {
  name: "@app/rateLimit",
  register: async function (server: Hapi.Server) {
    const rateLimiter = new RateLimiterRedis({
      storeClient: Redis.createClient({
        host: Config.redis.host,
        port: Config.redis.port,
        enable_offline_queue: false,
      }),
      ...Config.rateLimit,
    });

    let limiter: RateLimiterRes;

    server.ext(
      "onPreAuth",
      async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
          limiter = await rateLimiter.consume(request.info.remoteAddress);
          return h.continue;
        } catch (error) {
          if (error instanceof Error) {
            return Boom.internal("Try later.");
          } else {
            const boomError = Boom.tooManyRequests("Rate limit exceeded.");
            boomError.reformat();
            boomError.output.headers = {
              ["Retry-After"]: Math.round(error.msBeforeNext / 1000) || 1,
            };
            return boomError;
          }
        }
      }
    );

    server.ext(
      "onPreResponse",
      (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        if (limiter) {
          const { msBeforeNext, consumedPoints, remainingPoints } = limiter;

          if (request.response instanceof BoomType) {
            request.response.output.headers = {
              "X-Rate-Limit-Limit": consumedPoints,
              "X-Rate-Limit-Remaining": remainingPoints,
              "X-Rate-Limit-Reset": new Date(Date.now() + msBeforeNext),
            };
            return h.continue;
          }

          request.response.header(
            "X-Rate-Limit-Limit",
            consumedPoints.toString()
          );
          request.response.header(
            "X-Rate-Limit-Remaining",
            remainingPoints.toString()
          );
          request.response.header(
            "X-Rate-Limit-Reset",
            `${new Date(Date.now() + msBeforeNext)}`
          );
          return h.continue;
        }
        return h.continue;
      }
    );
  },
};

export default rateLimitPlugin;
