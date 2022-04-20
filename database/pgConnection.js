import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config({
  path: "./config/env/config.env",
});
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
export default pool;
