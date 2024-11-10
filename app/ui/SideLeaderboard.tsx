"use client";

import { useState, useEffect } from "react";
import { Leaderboard } from "@/app/lib/types";
import { fetchLeaderboard } from "@/app/lib/fetchService";

const SideLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  useEffect(() => {
    const getLeaderboardData = async () => {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    };
    getLeaderboardData();
  }, []);
  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Highest Streak</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>{player.higheststreak}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SideLeaderboard;
