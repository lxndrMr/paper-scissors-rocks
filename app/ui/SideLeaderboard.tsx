"use client";

import { useState } from "react";
import { useLeaderboard } from "@/app/context/LeaderboardContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SideLeaderboard = () => {
  const { leaderboard } = useLeaderboard();
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="m-4 flex flex-col justify-center ">
      <TableCaption onClick={toggleVisibility} className="cursor-pointer mb-4">
        🏆
      </TableCaption>
      {isVisible && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Highest Streak</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.username}</TableCell>
                <TableCell>{player.higheststreak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SideLeaderboard;
