import { Router } from "express";
import { nanoid } from "nanoid";

import { insertNewUrl } from "./db/urls.js";
import Logger from "./lib/logger.js";

const apiRouter = Router();

apiRouter.post("/url", (req, res) => {
    Logger.debug(req.body);

    const id = nanoid();
    const uri = {
        id,
        url: req.body.url,
    };

    insertNewUrl(uri)
        .then((_) => res.status(201).json({ id }))
        .catch((e) => {
            Logger.emerg(e);
            res.status(500).json({ ...e });
        });
});

export default apiRouter;
