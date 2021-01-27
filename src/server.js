/* eslint-disable import/first */

require("dotenv").config();

const app = require("./app");
const Logger = require("./lib/logger.js");

const appPort = process.env.PORT || "9000";

app.listen(appPort, "0.0.0.0", () => {
    Logger.info(`listening on port ${appPort}`);
    Logger.info(`Environment: ${process.env.NODE_ENV}`);
});
