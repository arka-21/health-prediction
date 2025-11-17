import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Smart Health Prediction System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered health predictions based on your symptoms. 
            Track your health history and make informed decisions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/predict">Get Prediction</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link href="/history">View History</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered</CardTitle>
              <CardDescription>
                Advanced AI analysis using Groq
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get accurate health predictions powered by cutting-edge AI technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your data is safe with us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All your health data is securely stored and accessible only to you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>History Tracking</CardTitle>
              <CardDescription>
                Keep track of all predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View your complete prediction history anytime, anywhere.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

