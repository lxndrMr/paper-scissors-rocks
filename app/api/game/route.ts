import { NextRequest, NextResponse } from "next/server";
import { getWinner, getComputerChoice } from "@/app/lib/gameLogic";
import { Choice, GameState } from "@/app/lib/types";

const gameState: GameState = {
  victoryStreak: 0,
  gameOver: false,
};

export async function POST(req: NextRequest) {
  const { playerChoice, reset }: { playerChoice: Choice; reset?: boolean } =
    await req.json();

  if (reset) {
    gameState.victoryStreak = 0;
    gameState.gameOver = false;
    return NextResponse.json({
      message: "New game started",
      victoryStreak: gameState.victoryStreak,
      gameOver: gameState.gameOver,
    });
  }

  if (gameState.gameOver) {
    return NextResponse.json({
      message: "Game over, click restart to start a new game",
      victoryStreak: gameState.victoryStreak,
      gameOver: gameState.gameOver,
    });
  }

  const computerChoice = getComputerChoice();

  const result = getWinner(playerChoice, computerChoice);

  if (result === "Win") {
    gameState.victoryStreak += 1;
  } else if (result === "Lose") {
    gameState.gameOver = true;
  }

  return NextResponse.json({
    playerChoice,
    computerChoice,
    result,
    victoryStreak: gameState.victoryStreak,
    gameOver: gameState.gameOver,
  });
}
