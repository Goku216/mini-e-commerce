import { NextResponse } from "next/server"
import { users } from "@/lib/users"
import { signJwtToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = users.find(u => u.email === email)
  if (!user || !await bcrypt.compare(password, user.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const token = signJwtToken({ id: user.id, email: user.email })

  return NextResponse.json({ success: true, token })
}
