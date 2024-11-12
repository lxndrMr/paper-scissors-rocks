import type { Metadata } from "next";
import "./globals.css";

import { LeaderboardProvider } from "@/app/context/LeaderboardContext";

import SideLeaderboard from "./ui/SideLeaderboard";

export const metadata: Metadata = {
  title: "Paper | Scissors | Rocks",
  description:
    "Play the classic Paper-Scissors-Rock game online! Challenge the computer or a friend, make your choice, and see who wins. Simple, fun, and free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LeaderboardProvider>
        <body className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-orange-50">
          <header className="flex-none m-4 md:w-64 bg-orange-600 text-white border-2 border-slate-400 rounded-lg">
            <SideLeaderboard />
          </header>
          <div className="bg-foreground flex-grow p-6 md:overflow-y-auto md:p-12">
            <h1 className="text-center text-4xl mb-8 tracking-wider">Paper | Scissors | Rocks</h1>
            {children}
          </div>
        </body>
      </LeaderboardProvider>
    </html>
  );
}
