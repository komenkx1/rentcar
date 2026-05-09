import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/register",
  "/lupa-sandi",
  "/kendaraan",
  "/tentang",
  "/kontak",
  "/promo",
  "/bantuan",
  "/kebijakan-privasi",
  "/syarat-ketentuan",
];

const ROLE_PATHS = {
  admin: ["/admin"],
  owner: ["/owner"],
  customer: ["/pesan", "/status", "/pesanan", "/profil", "/wishlist"],
};

function isPublicPath(path: string): boolean {
  return PUBLIC_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // API routes don't need middleware
  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check for public paths
  if (isPublicPath(path)) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get("rentcar-auth");

  // If no session, redirect to login
  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  // Parse session to check role
  try {
    const session = JSON.parse(
      Buffer.from(sessionCookie.value.split(".")[0], "base64").toString()
    );

    if (path.startsWith("/admin") && session.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (path.startsWith("/owner") && session.role !== "owner") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    // Invalid session, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/owner/:path*",
    "/pesan/:path*",
    "/status",
    "/pesanan/:path*",
    "/profil",
    "/wishlist",
  ],
};
