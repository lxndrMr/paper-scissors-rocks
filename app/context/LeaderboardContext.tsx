"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { fetchLeaderboard } from "../service/fetchService";
import { Leaderboard, TLeaderboardContext } from "../lib/types";

const LeaderboardContext = createContext<TLeaderboardContext | undefined>(
  undefined
);

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error("useLeaderboard must be used within a LeaderboardProvider");
  }
  return context;
};

export const LeaderboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

  const updateLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error updating leaderboard", error);
    }
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);
  return (
    <LeaderboardContext.Provider value={{ leaderboard, updateLeaderboard }}>
      {children}
    </LeaderboardContext.Provider>
  );
};
