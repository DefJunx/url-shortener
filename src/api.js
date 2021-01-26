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

    insertNewUrl(uri)
        .then((_) => res.status(201).json({ id }))
        .catch((e) => {
            console.log(e);
            res.status(500).json({ ...e });
        });
});

export default apiRouter;
