"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  playGame,
  resetGame,
  getPlayerHighScore,
} from "@/app/lib/fetchService";
import { Choice } from "@/app/lib/types";

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highestStreak, setHightestStreak] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }

    const getHighestStreak = async () => {
      try {
        const highestStreak = await getPlayerHighScore(username);
        setHightestStreak(highestStreak);
      } catch (error) {
        console.error("Error getting player highest streak", error);
      }
    };

    getHighestStreak();
  }, [username, router]);

  const handlePlayGame = async (choice: Choice) => {
    if (!username) return;

    try {
      const result = await playGame(choice, username);
      setPlayerChoice(choice);
      setGameResult(result.result);
      setScore(result.score);
      setHightestStreak(result.highestStreak);

      if (result.result === "Lose") {
        setGameOver(true);
      }
    } catch (error) {
      console.error("Error during the game", error);
    }
  };

  const handleResetGame = async () => {
    if (!username) return;

    try {
      const result = await resetGame(username);
      setScore(result.score);
      setGameResult(null);
      setPlayerChoice(null);
      setGameOver(false);
    } catch (error) {
      console.error("Error resetting the game", error);
    }
  };

  return (
    <div>
      <p>Username: {username}</p>
      <p>Highest Streak: {highestStreak}</p>
      <div>
        <button onClick={() => handlePlayGame("rock")} disabled={gameOver}>
          Rock
        </button>
        <button onClick={() => handlePlayGame("paper")} disabled={gameOver}>
          Paper
        </button>
        <button onClick={() => handlePlayGame("scissors")} disabled={gameOver}>
          Scissors
        </button>
      </div>

      <div>
        {playerChoice && <p>You chose: {playerChoice}</p>}
        {gameResult && <p>Result: {gameResult}</p>}
        {score !== null && <p>Score: {score}</p>}
      </div>

      <div>
        {gameOver && (
          <div>
            <p>Game Over! You lost. Would you like to play again?</p>
            <button onClick={handleResetGame}>Restart Game</button>
          </div>
        )}
      </div>
    </div>
  );
}
