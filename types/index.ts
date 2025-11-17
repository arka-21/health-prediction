export interface User {
  _id?: string
  email: string
  password: string
  createdAt?: Date
}

export interface Prediction {
  _id?: string
  userId: string
  symptoms: string
  age?: number
  weight?: number
  allergies?: string
  duration?: string
  result: string
  createdAt: Date
}

