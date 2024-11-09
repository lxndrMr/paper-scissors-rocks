"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitUsername } from "@/app/lib/fetchService";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username) {
      console.error("Username is required!");
      return;
    }

    try {
      const data = await submitUsername(username)

      if (data.username) {
        router.push(`/game?username=${username}`);
      } else {
        console.error("Failed to submit username");
      }
    } catch (error) {
      console.error("Error during username submission", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}
