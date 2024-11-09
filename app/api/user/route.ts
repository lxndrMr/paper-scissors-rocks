import { NextRequest, NextResponse } from "next/server";
import { addPlayer } from "@/app/lib/userService";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();

    if (!username || username.trim() === "") {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const result = await addPlayer(username);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing user:", error);
    return NextResponse.json(
      { message: "Error processing user" },
      { status: 500 }
    );
  }
}
