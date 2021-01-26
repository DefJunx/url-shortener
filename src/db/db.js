import monk from "monk";

const db = monk(process.env.DB_URL);

export default db;
