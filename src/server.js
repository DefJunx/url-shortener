import app from "./app.js";
import Logger from "./lib/logger.js";

const appPort = process.env.PORT || "1337";

app.listen(appPort, "0.0.0.0", () => {
    Logger.info(`listening on port ${appPort}`);
    Logger.info(`Environment: ${process.env.NODE_ENV}`);
});
