"use server"

import { ObjectId } from "mongodb"
import { getDb } from "./db"
import { getCurrentUser } from "./auth"
import { askGroq } from "./groq"
import type { Prediction } from "@/types"

export async function savePrediction(
  symptoms: string,
  age?: number,
  weight?: number,
  allergies?: string,
  duration?: string
): Promise<{ success: boolean; message: string; prediction?: Prediction }> {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return JSON.parse(JSON.stringify({ success: false, message: "You must be logged in to save predictions" }))
    }

    // Create input string for Groq
    const input = `
    You are an expert LLM, your job is to predict the possible illness based on the given information.
    If user inputs any inforamtion that is irrelevent to this, just answer based on your LLM knowledge.
\n\n    

    <Inputs>
    Symptoms: ${symptoms}
    ${age ? `Age: ${age} years` : ""}
    ${weight ? `Weight: ${weight} kg` : ""}
    ${allergies ? `Allergies: ${allergies}` : ""}
    ${duration ? `Duration: ${duration}` : ""}
    </Inputs>
`

    // Get AI prediction
    const result = await askGroq(input)

    // Save to database
    const db = await getDb()
    const predictionsCollection = db.collection<Prediction>("predictions")

    const prediction: Prediction = {
      userId,
      symptoms,
      age,
      weight,
      allergies,
      duration,
      result,
      createdAt: new Date(),
    }

    const insertResult = await predictionsCollection.insertOne(prediction)

    if (insertResult.insertedId) {
      return JSON.parse(JSON.stringify({
        success: true,
        message: "Prediction saved successfully",
        prediction: { ...prediction, _id: insertResult.insertedId.toString() },
      }))
    }

    return JSON.parse(JSON.stringify({ success: false, message: "Failed to save prediction" }))
  } catch (error) {
    console.error("Save prediction error:", error)
    return JSON.parse(JSON.stringify({ success: false, message: error instanceof Error ? error.message : "An error occurred" }))
  }
}

export async function getUserPredictions(): Promise<Prediction[]> {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return JSON.parse(JSON.stringify([]))
    }

    const db = await getDb()
    const predictionsCollection = db.collection<Prediction>("predictions")

    const predictions = await predictionsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray()

    return JSON.parse(JSON.stringify(predictions.map(pred => ({
      ...pred,
      _id: pred._id?.toString(),
      createdAt: pred.createdAt instanceof Date ? pred.createdAt : new Date(pred.createdAt),
    })))) as Prediction[]
  } catch (error) {
    console.error("Get predictions error:", error)
    return JSON.parse(JSON.stringify([]))
  }
}

export async function deletePrediction(predictionId: string): Promise<{ success: boolean; message: string }> {
  try {
    const userId = await getCurrentUser()
    if (!userId) {
      return JSON.parse(JSON.stringify({ success: false, message: "You must be logged in" }))
    }

    const db = await getDb()
    const predictionsCollection = db.collection<Prediction>("predictions")

    // Convert string ID to ObjectId
    let objectId: ObjectId
    try {
      objectId = new ObjectId(predictionId)
    } catch {
      return JSON.parse(JSON.stringify({ success: false, message: "Invalid prediction ID" }))
    }

    const result = await predictionsCollection.deleteOne({
      _id: objectId as any,
      userId,
    })

    if (result.deletedCount > 0) {
      return JSON.parse(JSON.stringify({ success: true, message: "Prediction deleted successfully" }))
    }

    return JSON.parse(JSON.stringify({ success: false, message: "Prediction not found" }))
  } catch (error) {
    console.error("Delete prediction error:", error)
    return JSON.parse(JSON.stringify({ success: false, message: "An error occurred" }))
  }
}

