import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export const SESSION_OPTIONS: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "rentcar-auth",
  ttl: 7 * 24 * 60 * 60, // 7 days
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | "owner";
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const session = await getIronSession<UserSession>(cookieStore, SESSION_OPTIONS);

  if (!session || !session.id || !session.role) {
    return null;
  }

  return session as UserSession;
}

export async function requireAuth(requiredRoles?: ("customer" | "admin" | "owner")[]) {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (requiredRoles && !requiredRoles.includes(session.role)) {
    throw new Error("Forbidden");
  }

  return session;
}
