import path from "path";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "./api.js";
import { flushAll, getUrl } from "./db/urls.js";
import db from "./db/db.js";
import Logger from "./lib/logger.js";
import { rootPath } from "./constants.js";

const FLUSHING_INTERVAL = 60 * 60 * 24 * 3;

dotenv.config();

const app = express();

db.then(() => {
    Logger.info("mongodb connected");

    setInterval(() => {
        flushAll()
            .then(() => Logger.info("Flushed all documents"))
            .catch((e) => Logger.warn("Failed to flush collection:", e));
    }, FLUSHING_INTERVAL);
}).catch((e) => Logger.emerg(e));

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.resolve(rootPath, "..", "static")));
app.use("/api", apiRouter);

app.get("/:uriId", (req, res) => {
    const { uriId } = req.params;
    Logger.info("uriId", uriId);

    getUrl(uriId)
        .then((dbEntry) => {
            Logger.info("found url in db mongo:", dbEntry.url);
            res.redirect(dbEntry.url);
        })
        .catch((e) => {
            Logger.emerg(e);
            res.json({ ...e });
        });
});

export default app;
