const db = require("./db");

const urls = db.get("urls");

/**
 * @typedef {Object} UrlObject
 * @property {string} id
 * @property {string} url
 */

/**
 * Retrieve url object from DB
 *
 * @param {string} id
 * @returns {Promise<UrlObject>}
 */
async function getUrl(id) {
    return urls.findOne({ id });
}

/**
 * Inserts url object in DB
 *
 * @param {UrlObject} urlObject
 */
async function insertNewUrl(urlObject) {
    const url = await getUrl(urlObject.id);

    console.log("url: ", url);

    if (!url) {
        console.log("no url, proceed");
        return urls.insert(urlObject);
    }

    return Promise.reject(new Error("Id already in use"));
}

/**
 * Flushes all documents on collection
 */
async function flushAll() {
    return urls.remove({});
}

module.exports = { getUrl, flushAll, insertNewUrl };
