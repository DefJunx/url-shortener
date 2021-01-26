import path from "path";
import winston from "winston";

import { rootPath as currPath } from "../constants.js";

const Logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level: "warn",
    handleExceptions: true,
    transports: [
        new winston.transports.File({
            filename: path.resolve(currPath, "..", "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.resolve(currPath, "..", "combined.log"),
        }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
    Logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );

    Logger.level = "debug";
}

export default Logger;
