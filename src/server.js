import app from "./app.js";

const appPort = process.env.PORT || "1337";

app.listen(appPort, () => {
    console.log(`listening on port ${appPort}`);
});
