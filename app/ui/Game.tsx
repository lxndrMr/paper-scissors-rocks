"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLeaderboard } from "../context/LeaderboardContext";
import {
  playGame,
  resetGame,
  getPlayerHighScore,
} from "@/app/service/fetchService";
import { Choice } from "@/app/lib/types";
import { Button } from "@/components/ui/button";

const choiceEmojis = {
  rock: "✊",
  paper: "🖐️",
  scissors: "✌️",
};

const resultEmojis = {
  Win: "🥳",
  Lose: "😭",
  Draw: "😐",
};

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [gameResult, setGameResult] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [highestStreak, setHightestStreak] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const { updateLeaderboard } = useLeaderboard();

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

    setPlayerChoice(choice);
    setIsWaiting(true);

    setTimeout(async () => {
      try {
        const result = await playGame(choice, username);
        setComputerChoice(result.computerChoice);
        setGameResult(result.result);
        setScore(result.score);
        setHightestStreak(result.highestStreak);
        setIsWaiting(false);

        updateLeaderboard();

        if (result.result === "Lose") {
          setGameOver(true);
        }
      } catch (error) {
        console.error("Error during the game", error);
      }
    }, 1000);
  };

  const handleResetGame = async () => {
    if (!username) return;

    try {
      const result = await resetGame(username);
      setScore(result.score);
      setGameResult(null);
      setPlayerChoice(null);
      setComputerChoice(null);
      setGameOver(false);

      updateLeaderboard();
    } catch (error) {
      console.error("Error resetting the game", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center border-2 bg-black text-white rounded-2xl p-8 w-full">
      <div className="grid grid-cols-5">
        <h1 className="col-span-5 text-center text-2xl font-bold text-orange-600 mb-4">
          Let&apos;s play {username} !
        </h1>
        {highestStreak > 0 && (
          <p className="col-span-5 text-center text-2xl font-bold text-orange-600 mb-4">
            Your best streak: {highestStreak}
          </p>
        )}
        <p className="col-start-1 col-span-2 text-center mb-4">
          Your Choice: {playerChoice ? choiceEmojis[playerChoice] : "❓"}
        </p>
        <div className="col-start-4 col-span-2 text-center">
          Computer&apos;s Choice:{" "}
          {isWaiting ? (
            <div className="spinner inline-block "></div>
          ) : computerChoice ? (
            choiceEmojis[computerChoice]
          ) : (
            "❓"
          )}
        </div>

        <Button
          className="col-start-1"
          onClick={() => handlePlayGame("rock")}
          disabled={gameOver}
        >
          ✊
        </Button>
        <Button
          className="col-start-3"
          onClick={() => handlePlayGame("paper")}
          disabled={gameOver}
        >
          🖐️
        </Button>
        <Button
          className="col-start-5"
          onClick={() => handlePlayGame("scissors")}
          disabled={gameOver}
        >
          ✌️
        </Button>

        {gameResult && (
          <p className="col-span-5 text-center text-xl font-semibold my-4">
            {resultEmojis[gameResult as keyof typeof resultEmojis]} {gameResult}
          </p>
        )}

        <p className="col-span-5 text-center">Your score: {score}</p>

        {gameOver && (
          <div className="col-span-5 text-center mb-4">
            <p className="mb-4">Game Over! Would you like to play again?</p>
            <Button className="w-32" onClick={handleResetGame}>
              Restart Game
            </Button>
          </div>
        )}
      </div>
      <Button className="w-32" onClick={() => router.push("/")}>
        Go Home
      </Button>
    </main>
  );
}
