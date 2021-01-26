import app from "./app.js";
import Logger from "./lib/logger.js";

const appPort = process.env.PORT || "1337";

app.listen(appPort, () => {
    Logger.info(`listening on port ${appPort}`);
});
