import bcrypt from "bcryptjs"

const hashed=await bcrypt.hash("admin123",10)
export const users = [
  { id: 1, email: "admin@demo.com", password:hashed } 
]
