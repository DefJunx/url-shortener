import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "./api.js";
import { flushAll, getUrl } from "./db/urls.js";
import db from "./db/db.js";

const FLUSHING_INTERVAL = 60 * 60 * 24 * 3;

dotenv.config();

const app = express();

db.then((c) => {
    console.log("mongodb connected");
    setInterval(() => {
        flushAll()
            .then((_) => console.log("Flushed all documents"))
            .catch((e) => console.log("Failed to flush collection:", e));
    }, FLUSHING_INTERVAL);
}).catch((e) => console.log(e));

const currPath = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.resolve(currPath, "..", "static")));
app.use("/api", apiRouter);

app.get("/:uriId", (req, res) => {
    const { uriId } = req.params;
    console.log("uriId", uriId);

    getUrl(uriId)
        .then((dbEntry) => {
            console.log("found url in db mongo:", dbEntry.url);
            res.redirect(dbEntry.url);
        })
        .catch((e) => {
            console.log(e);
            res.json({ ...e });
        });
});

export default app;
