"use client"

import { getPlayerHighScore } from "@/app/service/fetchService"; // Assure-toi d'importer correctement
import Game from "@/app/ui/Game"; // Assure-toi d'importer correctement le composant
import { useSearchParams } from "next/navigation"; // Utilisation du hook de navigation de Next.js
import { useEffect, useState } from "react"; // Importer useEffect et useState

export const dynamic = "force-dynamic";

export default function GamePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [highestStreak, setHighestStreak] = useState<number | null>(null);

  useEffect(() => {
    if (!username) {
      // Si le paramètre username est manquant, tu peux rediriger ou afficher une erreur
      return;
    }

    const fetchHighestStreak = async () => {
      try {
        const streak = await getPlayerHighScore(username);
        setHighestStreak(streak);
      } catch (error) {
        console.error("Error fetching highest streak:", error);
      }
    };

    fetchHighestStreak();
  }, [username]); // Cette logique ne sera exécutée que si `username` change

  if (highestStreak === null) {
    return <div>Loading...</div>; // Affiche un message pendant le chargement des données
  }

  return (
    <div>
      <Game username={username} highestStreak={highestStreak} />
    </div>
  );
}
