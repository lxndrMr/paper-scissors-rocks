import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

const pool = new Pool({
  user: POSTGRES_USER,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT || "5432"),
});

async function createPlayerTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS player (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  score INT NOT NULL DEFAULT 0,
  highestStreak INT NOT NULL DEFAULT 0
  )
  `

  try {
    await pool.query(query);
  } catch (error) {
    console.error("Error creating player table", error);
  }
}

createPlayerTable();

export default pool;
