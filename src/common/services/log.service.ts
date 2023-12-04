import * as winston from "winston";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LogService {
  private readonly logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple(),
      ),
    });
  }

  async info(msg: string) {
    return this.logger.info(msg);
  }

  async error(msg: string) {
    return this.logger.error(msg);
  }

  async warn(msg: string) {
    return this.logger.warn(msg);
  }
}
