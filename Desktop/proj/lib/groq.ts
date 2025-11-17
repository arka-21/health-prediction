"use server"

export async function askGroq(input: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment variables")
  }

  const maxRetries = 5
  let retryCount = 0
  let waitTime = 1000 // Start with 1 second

  while (retryCount < maxRetries) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a medical risk analysis model. Based on symptoms, age, duration, give a simple prediction of possible illness and a confidence percentage. Return answer in clean plain text. Be concise and professional."
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (response.status === 429) {
        // Rate limited, wait and retry
        retryCount++
        if (retryCount < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, waitTime))
          waitTime *= 2 // Exponential backoff
          continue
        } else {
          throw new Error("Rate limit exceeded. Please try again later.")
        }
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Groq API error: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || "No prediction available"
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        retryCount++
        await new Promise(resolve => setTimeout(resolve, waitTime))
        waitTime *= 2
        continue
      }
      throw error
    }
  }

  throw new Error("Failed to get prediction after multiple retries")
}

