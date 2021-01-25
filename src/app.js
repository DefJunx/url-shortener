import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

const currPath = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(currPath, "..", "static", "index.html"));
});

export default app;
