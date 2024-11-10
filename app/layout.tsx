import type { Metadata } from "next";
import "./globals.css";
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
      <body>
        <SideLeaderboard />
        {children}
      </body>
    </html>
  );
}
