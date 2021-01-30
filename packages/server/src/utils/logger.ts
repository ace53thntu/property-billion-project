import Winston from "winston";
import chalk from "chalk";

export class WinstonLogger {
  public static newInstance(): Winston.Logger {
    const consoleTransport = new Winston.transports.Console({
      format: Winston.format.combine(
        // Winston.format.colorize(),
        Winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        Winston.format.align(),
        Winston.format.printf((info) => {
          const { timestamp, message, level, meta } = info;

          const currentLevel = level.toUpperCase();

          let outputLevel = "";

          switch (currentLevel) {
            case "INFO":
              outputLevel = chalk.cyan(currentLevel);
              break;

            case "WARN":
              outputLevel = chalk.yellow(currentLevel);
              break;

            case "ERROR":
              outputLevel = chalk.red(currentLevel);
              break;

            default:
              break;
          }

          return `[${timestamp}] [${outputLevel}]: ${message} ${
            meta && Object.keys(meta).length
              ? `\n ${JSON.stringify(meta, null, 2)}`
              : ""
          }`;
        })
      ),
      level: "info",
    });

    return Winston.createLogger({
      transports: [consoleTransport],
    });
  }
}

export const Logger = WinstonLogger.newInstance();
