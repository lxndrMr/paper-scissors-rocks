import dotenv from "dotenv";
import { Pool } from "pg";

// Charger les variables d'environnement
dotenv.config();

// Récupération des variables d'environnement
const {
  POSTGRES_USER,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_URL, // URL pour les environnements comme Supabase/Vercel
  NODE_ENV, // Environnement d'exécution
} = process.env;

// Configuration du pool
const connectionString =
  NODE_ENV === "production" && POSTGRES_URL ? POSTGRES_URL : undefined;

const pool = new Pool({
  connectionString, // URL pour la production
  user: connectionString ? undefined : POSTGRES_USER, // Fallback aux variables locales
  host: connectionString ? undefined : POSTGRES_HOST,
  database: connectionString ? undefined : POSTGRES_DB,
  password: connectionString ? undefined : POSTGRES_PASSWORD,
  port: connectionString ? undefined : parseInt(POSTGRES_PORT || "5432", 10),
  ssl:
    NODE_ENV === "production"
      ? {
          rejectUnauthorized: false, // Accepter les certificats auto-signés (Supabase)
        }
      : false, // Pas de SSL en local
});

// Fonction pour créer la table "player"
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
    console.log("Table 'player' verified/created successfully.");
  } catch (error) {
    console.error("Error creating player table:", error);
  }
}

// Appeler la fonction au chargement
createPlayerTable();

// Exporter le pool pour d'autres parties de l'application
export default pool;