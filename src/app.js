const path = require("path");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const apiRouter = require("./api");
const { flushAll, getUrl } = require("./db/urls");
const db = require("./db/db.js");
const Logger = require("./lib/logger.js");

const FLUSHING_INTERVAL = 60 * 60 * 24 * 3;

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
app.use(express.static(path.resolve(__dirname, "static")));
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

module.exports = app;
