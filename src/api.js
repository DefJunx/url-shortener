import { Router } from "express";
import { nanoid } from "nanoid";

const apiRouter = Router();

apiRouter.post("/url", (req, res) => {
    console.log(req.body);

    const id = nanoid();
    const uri = {
        id,
        url: req.body.url,
    };

    res.json({ ...uri });
});

export default apiRouter;
