import Hapi from "@hapi/hapi";
import __isError from "lodash/isError";
import __isEmpty from "lodash/isEmpty";
// import __omitDeep from "omit-deep-lodash";
import __pick from "lodash/pick";
import { AuditLogEntity } from "../entities/AuditLog";
import { AuditLogRepository } from "../repositories/AuditLogRepository";
import { getIP } from "../utils/getIP";
import { Boom } from "@hapi/boom";

export interface ILogCreateOptions {
  payloadExclude?: string[];
  payloadFilter?: string[];
}

export const logCreate = (entity: string, options?: ILogCreateOptions) => {
  const logCreateForEntity = async (
    request: Hapi.Request,
    h: Hapi.ResponseToolkit
  ) => {
    try {
      const auditLogRepo = request.server.app.dbConnection.getCustomRepository(
        AuditLogRepository
      );

      const ipAddress = getIP(request);
      const user: any = request.auth.credentials?.user;
      let statusCode,
        result = null,
        responseMessage = null;

      if (request.response instanceof Boom) {
        statusCode = request.response.output.statusCode;
        responseMessage = request.response.output.payload.message;
      } else {
        statusCode = request.response.statusCode;
        result = request.response.source;
      }

      let payload = {};
      // if (options.payloadExclude) {
      //   payload = __omitDeep(request.payload, options.payloadExclude);
      // } else if (options.payloadFilter) {
      //   payload = __pick(request.payload, options.payloadFilter);
      // }
      if (options?.payloadFilter) {
        payload = __pick(request.payload, options.payloadFilter);
      } else {
        payload = request.payload;
      }

      const data = {
        method: "POST",
        action: "Create",
        endpoint: request.path,
        user: user ? user?.id : null,
        entity,
        payload: __isEmpty(payload) ? null : payload,
        params: __isEmpty(request.params) ? null : request.params,
        result: result,
        isError: __isError(request.response),
        statusCode,
        ipAddress,
        responseMessage,
      } as AuditLogEntity;
      await auditLogRepo.insert(data);

      return h.continue;
    } catch (error) {
      request.log(["error"], error);
      return h.continue;
    }
  };

  logCreateForEntity.applyPoint = "onPreResponse";
  return logCreateForEntity;
};
logCreate.applyPoint = "onPreResponse";
