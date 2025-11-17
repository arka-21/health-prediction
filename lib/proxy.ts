"use server"

// Proxy utility for handling API requests
// This can be used for middleware routing if needed

export async function proxyRequest(url: string, options: RequestInit = {}): Promise<Response> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    console.error("Proxy request error:", error)
    throw error
  }
}

