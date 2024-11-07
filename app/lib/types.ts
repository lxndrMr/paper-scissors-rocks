export const choices = ["paper", "scissors", "rock"] as const;

export type Choice = (typeof choices)[number];

export type GameResult = "Win" | "Lose" | "Draw";

export type GameState = {
  victoryStreak: number;
  gameOver: boolean;
};
