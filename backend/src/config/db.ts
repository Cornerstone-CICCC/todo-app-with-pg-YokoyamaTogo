import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: "../.env" });

const requiredVariables = [
  "DB_USER",
  "DB_HOST",
  "DB_DATABASE",
  "DB_PASSWORD",
  "DB_PORT",
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`${variable} is missing from .env`);
  }
}

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});
