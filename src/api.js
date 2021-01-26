import { Router } from "express";
import { nanoid } from "nanoid";
import { insertNewUrl } from "./db/urls.js";

const apiRouter = Router();

apiRouter.post("/url", (req, res) => {
    console.log(req.body);

    const id = nanoid();
    const uri = {
        id,
        url: req.body.url,
    };

    insertNewUrl
        .then((_) => res.sendStatus(201))
        .catch((e) => {
            console.log(e);
            res.status(500).json({ ...e });
        });

    res.json({ ...uri });
});

export default apiRouter;
