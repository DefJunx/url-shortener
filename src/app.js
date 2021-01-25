import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import apiRouter from "./api.js";

dotenv.config();

const app = express();

const currPath = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.resolve(currPath, "..", "static")));
app.use("/api", apiRouter);

app.get("/:uriId", (req, res) => {
    const { uriId } = req.params;

    if (!uriId) {
        res.sendFile(path.resolve(currPath, "..", "static", "index.html"));
        return;
    }

    console.log("checking for uriId: ", uriId);
    res.sendFile(path.resolve(currPath, "..", "static", "index.html")); // TODO: Replace with db check logic etc.
});

export default app;
