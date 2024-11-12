import Game from "@/app/ui/Game";

export const metadata = {
  description:
    "Challenge yourself in the Paper-Scissors-Rock game! Compete against the computer, aim for the highest streak and test your luck!",
};

export default function GamePage() {
  return (
    <div>
      <Game />
    </div>
  );
}
