import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    host: `${process.env.DB_HOST}`,
    port: Number(process.env.DB_PORT) || 5432,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
});

client.connect();

export { client as db};