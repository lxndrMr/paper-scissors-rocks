import { choices, Choice, GameResult } from "@/app/lib/types";

export function getWinner(
  playerChoice: Choice,
  computerChoice: Choice
): GameResult {
  if (playerChoice === computerChoice) return "Draw";
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "scissors" && computerChoice === "paper") ||
    (playerChoice === "paper" && computerChoice === "rock")
  )
    return "Win";
  return "Lose";
}

export function getComputerChoice(): Choice {
  return choices[Math.floor(Math.random() * choices.length)];
}
