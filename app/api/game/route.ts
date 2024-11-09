import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { getWinner, getComputerChoice } from "@/app/lib/gameLogic"; // Logique du jeu
import { Choice, GameResult } from "@/app/lib/types";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const { rows } = await pool.query(
      "SELECT * FROM player WHERE username = $1",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Username not found" },
        { status: 404 }
      );
    }

    const highestStreak = rows[0].higheststreak;

    return NextResponse.json({ highestStreak });
  } catch (error) {
    console.error("Error processing game:", error);
    return NextResponse.json(
      { message: "Error processing game" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      playerChoice,
      username,
      reset,
    }: { playerChoice?: Choice; username: string; reset?: boolean } =
      await req.json();

    if (reset) {
      await pool.query("UPDATE player SET score = 0 WHERE username = $1", [
        username,
      ]);
      return NextResponse.json({ message: "Game reset", score: 0 });
    }

    if (!playerChoice) {
      return NextResponse.json(
        { message: "Player choice is required" },
        { status: 400 }
      );
    }

    const computerChoice = getComputerChoice();
    const result: GameResult = getWinner(playerChoice, computerChoice);

    const { rows } = await pool.query(
      "SELECT * FROM player WHERE username = $1",
      [username]
    );
    let score = rows.length > 0 ? rows[0].score : 0;
    let highestStreak = rows.length > 0 ? rows[0].higheststreak : 0;

    if (result === "Win") {
      score += 1;
      if (score > highestStreak) {
        highestStreak = score;
      }
    }
    await pool.query(
      `INSERT INTO player (username, score, higheststreak) 
    VALUES ($1, $2, $3) 
    ON CONFLICT (username) 
    DO UPDATE SET score = EXCLUDED.score, higheststreak = EXCLUDED.higheststreak`,
      [username, score, highestStreak]
    );
    return NextResponse.json({
      playerChoice,
      computerChoice,
      result,
      score,
      highestStreak,
    });
  } catch (error) {
    console.error("Error processing game:", error);
    return NextResponse.json(
      { message: "Error processing game" },
      { status: 500 }
    );
  }
}
