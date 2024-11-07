"use client";

import { useState } from "react";
import { choices, Choice, GameResult, GameState } from "@/app/lib/types";
import { playGame, resetGame } from "@/app/lib/gameService";

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [victoryStreak, setVictoryStreak] =
    useState<GameState["victoryStreak"]>(0);
  const [gameOver, setGameOver] = useState<GameState["gameOver"]>(false);

  const handlePlay = async (choice: Choice) => {
    const data = await playGame(choice);

    setPlayerChoice(data.playerChoice);
    setComputerChoice(data.computerChoice);
    setResult(data.result);
    setVictoryStreak(data.victoryStreak);
    setGameOver(data.gameOver);
  };

  const handleReset = async () => {
    const data = await resetGame();
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setVictoryStreak(data.victoryStreak);
    setGameOver(data.gameOver);
  };

  return (
    <div>
      <h1>Paper | Scissors | Rock</h1>
      <div>
        {choices.map((choice) => (
          <button
            key={choice}
            className="p-4"
            onClick={() => handlePlay(choice)}
            disabled={gameOver}
          >
            {choice}
          </button>
        ))}
      </div>
      <div>
        <p>Player choice: {playerChoice}</p>
        <p>Computer choice: {computerChoice}</p>
        <p>Result: {result}</p>
        <p>Victory streak: {victoryStreak}</p>
      </div>
      {gameOver && (
        <div>
          <h2>The game is over! You won {victoryStreak} times.</h2>
          <button onClick={handleReset}>Restart</button>
        </div>
      )}
    </div>
  );
}
