"use client";

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

  return (
    <div className="m-4">
      <Table>
      <TableCaption>🏆</TableCaption>
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
    </div>
  );
};

export default SideLeaderboard;
