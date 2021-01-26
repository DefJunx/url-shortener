import monk from "monk";

console.log("process.env.DB_URL:", process.env.DB_URL);

const db = monk(process.env.DB_URL, { authSource: "admin" });

export default db;
