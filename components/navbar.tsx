"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getCurrentUser, logoutUser } from "@/lib/auth"

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      const userId = await getCurrentUser()
      setIsLoggedIn(!!userId)
      setLoading(false)
    }
    checkAuth()
  }, [pathname])

  async function handleLogout() {
    await logoutUser()
    setIsLoggedIn(false)
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              Health Prediction
            </Link>
            <div className="hidden md:flex gap-4">
              <Link
                href="/predict"
                className={`text-sm transition-colors hover:text-primary ${
                  pathname === "/predict" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                Predict
              </Link>
              <Link
                href="/history"
                className={`text-sm transition-colors hover:text-primary ${
                  pathname === "/history" ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                History
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-20 h-8" />
            ) : isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

