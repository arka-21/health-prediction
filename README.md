# Smart Health Prediction System

A complete Next.js 14 application for AI-powered health predictions using Groq API and MongoDB.

## Features

- ✅ User Registration & Login
- ✅ Health Input Form
- ✅ AI Health Prediction using Groq
- ✅ Save Predictions to MongoDB
- ✅ Prediction History Page
- ✅ Delete History Items
- ✅ Protected Routes
- ✅ Responsive Modern UI with shadcn/ui

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **MongoDB** (Official Driver, no schemas)
- **Next.js Server Actions**
- **shadcn/ui** components
- **Groq API** for AI predictions
- **Tailwind CSS**
- **ESLint**

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/health-prediction
   GROQ_API_KEY=your_groq_api_key_here
   ```

   - Get MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use local MongoDB
   - Get free Groq API key from [Groq Console](https://console.groq.com/)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
/app
  /api
  /predict
    page.tsx
  /history
    page.tsx
  /login
    page.tsx
/components
  /ui
  navbar.tsx
/lib
  db.ts          # MongoDB connection
  groq.ts        # Groq API integration
  auth.ts        # Authentication
  predictions.ts # Prediction actions
  proxy.ts       # Proxy utility
  utils.ts       # Utility functions
/types
  index.ts       # TypeScript interfaces
```

## Features Explained

### 1. User Registration & Login
- Secure password hashing with bcrypt
- Session management with Next.js cookies
- Protected routes

### 2. Health Input Form
- Collects symptoms, age, weight, allergies, duration
- Uses shadcn/ui components for clean UI

### 3. AI Health Prediction
- Integrates with Groq API
- Automatic retry with exponential backoff on rate limits
- Returns structured predictions

### 4. Prediction History
- View all saved predictions
- Delete individual predictions
- Chronologically sorted

## Database Schema

Uses TypeScript interfaces (no Mongoose schemas):

```typescript
interface User {
  _id?: string
  email: string
  password: string
  createdAt?: Date
}

interface Prediction {
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
```

## License

MIT

