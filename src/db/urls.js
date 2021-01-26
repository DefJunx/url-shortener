import db from "./db.js";

const urls = db.get("urls");

/**
 * @typedef {Object} UrlObject
 * @property {string} id
 * @property {string} url
 */

/**
 * Retrieve url from DB
 *
 * @param {string} id
 * @returns {UrlObject}
 */
export async function getUrl(id) {
    return urls.findOne({ id });
}

/**
 * Inserts url in DB
 *
 * @param {UrlObject} urlObject
 */
export async function insertNewUrl(urlObject) {
    const url = await getUrl(urlObject.id);

    if (!url) {
        return urls.insert(urlObject);
    }

    return Promise.reject(new Error("Id already in use"));
}
