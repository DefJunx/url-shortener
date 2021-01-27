const monk = require("monk");
const Logger = require("../lib/logger");

Logger.debug(`process.env.DB_URL: ${process.env.DB_URL}`);

module.exports = monk(process.env.DB_URL, { authSource: "admin" });
