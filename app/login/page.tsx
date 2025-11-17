"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser, registerUser } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = isLogin
        ? await loginUser(email, password)
        : await registerUser(email, password)

      if (result.success) {
        router.push("/predict")
        router.refresh()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your credentials to access your account"
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
              }}
              className="text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

