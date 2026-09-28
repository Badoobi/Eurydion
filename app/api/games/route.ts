import { NextResponse } from "next/server";
import { getGamesPayload } from "@/lib/roblox-games";

export const revalidate = 600;

export async function GET() {
  return NextResponse.json(await getGamesPayload());
}
