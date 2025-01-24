import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_URL, // Ajout pour la connexion via URL en production (Vercel / Supabase)
} = process.env;

// Si tu es en production, utilise la connexion URL de Supabase
const connectionString =
  process.env.NODE_ENV === "production" ? POSTGRES_URL : undefined;

const pool = new Pool({
  connectionString: connectionString, // Utilisation de connectionString si en prod
  user: !connectionString ? POSTGRES_USER : undefined, // Utiliser les variables individuelles en local
  host: !connectionString ? POSTGRES_HOST : undefined,
  database: !connectionString ? POSTGRES_DB : undefined,
  password: !connectionString ? POSTGRES_PASSWORD : undefined,
  port: !connectionString ? parseInt(POSTGRES_PORT || "5432") : undefined,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false, // SSL uniquement en prod
});

async function createPlayerTable() {
  const query = `
  CREATE TABLE IF NOT EXISTS player (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  score INT NOT NULL DEFAULT 0,
  highestStreak INT NOT NULL DEFAULT 0
  )
  `;

  try {
    await pool.query(query);
  } catch (error) {
    console.error("Error creating player table", error);
  }
}

createPlayerTable();

export default pool;
