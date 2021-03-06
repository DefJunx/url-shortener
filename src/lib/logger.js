const path = require("path");
const winston = require("winston");

const logPath = path.resolve(__dirname, "../logs");

const Logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    level: "info",
    handleExceptions: true,
    transports: [
        new winston.transports.File({
            filename: path.resolve(logPath, "error.log"),
            level: "error",
        }),
        new winston.transports.File({
            filename: path.resolve(logPath, "combined.log"),
        }),
    ],
});

Logger.stream = {
    write(message, encoding) {
        Logger.debug(message.trim());
    },
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production" || process.env.FORCE_CONSOLE) {
    Logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );

    Logger.level = "debug";
}

module.exports = Logger;
