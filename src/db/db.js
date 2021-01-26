import monk from "monk";
import Logger from "../lib/logger.js";

Logger.debug(`process.env.DB_URL: ${process.env.DB_URL}`);

const db = monk(process.env.DB_URL, { authSource: "admin" });

export default db;
