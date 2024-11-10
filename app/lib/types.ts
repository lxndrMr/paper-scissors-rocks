export type Choice = "rock" | "paper" | "scissors";
export const choices: Choice[] = ["rock", "paper", "scissors"];
export type GameResult = "Win" | "Lose" | "Draw";
export type Leaderboard = {
  username: string;
  higheststreak: number;
};
