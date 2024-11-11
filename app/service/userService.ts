import pool from "@/app/lib/db";

export async function addPlayer(username: string) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM player WHERE username = $1",
      [username]
    );
    if (rows.length > 0) {
      return { message: "User already exists", username };
    } else {
      await pool.query(
        "INSERT INTO player (username, score, highestStreak) VALUES ($1, $2, $3)",
        [username, 0, 0]
      );
      return { message: "User created", username };
    }
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Error creating user");
  }
}
