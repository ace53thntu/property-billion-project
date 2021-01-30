import { EntityRepository } from "typeorm";
import { AuthAttemptEntity } from "../entities/AuthAttempt";
import { BaseRepository } from "./BaseRepository";
import { Constants } from "../config/constants";

@EntityRepository(AuthAttemptEntity)
export class AuthAttemptRepository extends BaseRepository<AuthAttemptEntity> {
  async abuseDetected(ip: string, email: string) {
    const LOCKOUT_PERIOD = Constants.LOCKOUT_PERIOD;

    const expirationDate = LOCKOUT_PERIOD
      ? Date.now() - LOCKOUT_PERIOD * 60000
      : Date.now();

    const query = LOCKOUT_PERIOD
      ? "authAttempt.time > :expirationDate"
      : "authAttempt.time < :expirationDate";

    const abusiveIpCount = await this.repository
      .createQueryBuilder("authAttempt")
      .where(query, { expirationDate: new Date(expirationDate).toISOString() })
      .andWhere("authAttempt.ip = :ip", { ip })
      .getManyAndCount();

    const abusiveIpUserCount = await this.repository
      .createQueryBuilder("authAttempt")
      .where("authAttempt.ip = :ip", { ip })
      .andWhere("authAttempt.email = :email", { email: email.toLowerCase() })
      .andWhere(query, {
        expirationDate: new Date(expirationDate).toISOString(),
      })
      .getManyAndCount();

    const AUTH_ATTEMPTS = Constants.AUTH_ATTEMPTS;

    const ipLimitReached = abusiveIpCount[1] >= AUTH_ATTEMPTS.FOR_IP;
    const ipUserLimitReached =
      abusiveIpUserCount[1] >= AUTH_ATTEMPTS.FOR_IP_AND_USER;

    return ipLimitReached || ipUserLimitReached;
  }

  createInstance(ip: string, email: string): Promise<AuthAttemptEntity> {
    const data = {
      ip,
      email: email.toLowerCase(),
      time: new Date(),
    };
    return this.insert(data);
  }
}
