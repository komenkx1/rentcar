import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SESSION_OPTIONS } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, SESSION_OPTIONS);
  session.destroy();
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
