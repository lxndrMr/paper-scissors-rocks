import { Choice } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function playGame(playerChoice: Choice) {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerChoice }),
    });
    return await response.json()

  } catch (error) {
    console.error("Error playing game", error);
  }
}

export async function resetGame() {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reset: true }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error resetting game", error);
  }
}