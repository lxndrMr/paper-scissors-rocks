import { Choice } from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitUsername(username: string) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting username", error);
    throw error;
  }
}

export async function getPlayerHighScore(username: string) {
  try {
    const response = await fetch(`${API_URL}/game?username=${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.highestStreak;
  } catch (error) {
    console.error("Error getting player score", error);
    throw error;
  }
}

export async function playGame(playerChoice: Choice, username: string) {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerChoice, username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error playing game", error);
    throw error;
  }
}

export async function resetGame(username: string) {
  try {
    const response = await fetch(`${API_URL}/game`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reset: true, username }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error resetting game", error);
    throw error;
  }
}

export async function fetchLeaderboard() {
  try {
    const response = await fetch(`${API_URL}/leaderboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard", error);
    throw error;
  }
} 