"use server"

import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { getDb } from "./db"
import type { User } from "@/types"

export async function registerUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDb()
    const usersCollection = db.collection<User>("users")

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return { success: false, message: "User already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await usersCollection.insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    })

    if (result.insertedId) {
      // Set session cookie
      const cookieStore = await cookies()
      cookieStore.set("userId", result.insertedId.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return { success: true, message: "Registration successful" }
    }

    return { success: false, message: "Failed to create user" }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration" }
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDb()
    const usersCollection = db.collection<User>("users")

    const user = await usersCollection.findOne({ email })
    if (!user) {
      return { success: false, message: "Invalid email or password" }
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return { success: false, message: "Invalid email or password" }
    }

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("userId", user._id?.toString() || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true, message: "Login successful" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function getCurrentUser(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    return userId || null
  } catch {
    return null
  }
}

export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
}

