"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserPredictions, deletePrediction } from "@/lib/predictions"
import { getCurrentUser } from "@/lib/auth"
import { Loader2, Trash2 } from "lucide-react"
import type { Prediction } from "@/types"

export default function HistoryPage() {
  const router = useRouter()
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuthAndLoad() {
      const userId = await getCurrentUser()
      if (!userId) {
        router.push("/login")
        return
      }
      setCheckingAuth(false)
      await loadPredictions()
    }
    checkAuthAndLoad()
  }, [router])

  async function loadPredictions() {
    setLoading(true)
    try {
      const data = await getUserPredictions()
      setPredictions(data)
    } catch (error) {
      console.error("Error loading predictions:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this prediction?")) {
      return
    }

    setDeletingId(id)
    try {
      const result = await deletePrediction(id)
      if (result.success) {
        await loadPredictions()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert("An error occurred while deleting")
    } finally {
      setDeletingId(null)
    }
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Prediction History</h1>
          <p className="text-muted-foreground mt-2">
            View all your previous health predictions
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : predictions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No predictions yet. Get your first prediction!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {predictions.map((prediction) => (
              <Card key={prediction._id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Prediction</CardTitle>
                      <CardDescription>
                        {new Date(prediction.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => prediction._id && handleDelete(prediction._id)}
                      disabled={deletingId === prediction._id}
                    >
                      {deletingId === prediction._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Symptoms:</h3>
                    <p className="text-sm text-muted-foreground">{prediction.symptoms}</p>
                  </div>
                  {(prediction.age || prediction.weight || prediction.allergies || prediction.duration) && (
                    <div className="grid gap-2 md:grid-cols-2 text-sm">
                      {prediction.age && (
                        <div>
                          <span className="font-medium">Age: </span>
                          <span className="text-muted-foreground">{prediction.age} years</span>
                        </div>
                      )}
                      {prediction.weight && (
                        <div>
                          <span className="font-medium">Weight: </span>
                          <span className="text-muted-foreground">{prediction.weight} kg</span>
                        </div>
                      )}
                      {prediction.allergies && (
                        <div>
                          <span className="font-medium">Allergies: </span>
                          <span className="text-muted-foreground">{prediction.allergies}</span>
                        </div>
                      )}
                      {prediction.duration && (
                        <div>
                          <span className="font-medium">Duration: </span>
                          <span className="text-muted-foreground">{prediction.duration}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2">AI Prediction:</h3>
                    <p className="text-sm whitespace-pre-wrap">{prediction.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

