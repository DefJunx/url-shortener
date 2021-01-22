import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());

export default app;
