import { NextRequest, NextResponse } from "next/server"
import { verifyJwtToken } from "@/lib/auth"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  if (!token || !verifyJwtToken(token)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/admin"]
}
