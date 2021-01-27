const { Router } = require("express");
const nanoid = require("nanoid");
const { insertNewUrl } = require("./db/urls");

const Logger = require("./lib/logger.js");

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

module.exports = apiRouter;
