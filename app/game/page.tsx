import { getPlayerHighScore } from "@/app/service/fetchService"; // Assure-toi d'importer correctement
import Game from "@/app/ui/Game"; // Assure-toi d'importer correctement le composant

export default async function GamePage({ searchParams }: { searchParams: { username?: string } }) {
  // Récupération du paramètre username depuis searchParams
  const username = searchParams.username;
  
  // Vérifie si un username est présent dans les searchParams
  if (!username || Array.isArray(username)) {
    throw new Error('Invalid username');
  }

  // Récupère le highestStreak via ta fonction
  let highestStreak = 0;

  try {
    highestStreak = await getPlayerHighScore(username); // Assurez-vous que cette fonction retourne un nombre
  } catch (error) {
    console.error("Error fetching highest streak:", error);
  }

  return (
    <div>
      <Game username={username} highestStreak={highestStreak} />
    </div>
  );
}