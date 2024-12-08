import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  console.log(token);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};
