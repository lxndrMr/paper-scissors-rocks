import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const { rows } = await pool.query(
      "SELECT username, highestStreak FROM player ORDER BY highestStreak DESC LIMIT 10"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error processing leaderboard:", error);
    return NextResponse.json(
      { message: "Error processing leaderboard" },
      { status: 500 }
    );
  }
}
