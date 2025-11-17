# 🏥 Smart Health Prediction System

<div align="center">

![Landing Page](./public/landingpage.png)

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.3.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.7-38bdf8?style=for-the-badge&logo=tailwind-css)

**AI-Powered Health Predictions with Groq API & MongoDB**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Tech Stack](#-tech-stack)

</div>

---

## 📖 Overview

Smart Health Prediction System is a modern, full-stack web application that leverages cutting-edge AI technology to provide intelligent health predictions based on user symptoms. Built with Next.js 14, TypeScript, and MongoDB, it offers a seamless experience for users to track their health history and receive AI-powered insights.

### ✨ Key Highlights

- 🤖 **AI-Powered Predictions** - Utilizes Groq's lightning-fast LLM (Llama 3.1 8B) for instant health analysis
- 🔒 **Secure Authentication** - Password hashing with bcrypt and secure session management
- 📊 **History Tracking** - Complete prediction history with chronological sorting
- 🎨 **Modern UI** - Beautiful, responsive interface built with shadcn/ui and Tailwind CSS
- ⚡ **Server Actions** - Type-safe server-side operations with Next.js 14 App Router
- 🚀 **Production Ready** - Optimized for performance with automatic retry logic and error handling

---

## 🚀 Features

### Core Functionality

- ✅ **User Authentication**
  - Secure registration and login system
  - Session-based authentication with HTTP-only cookies
  - Protected routes with automatic redirects

- ✅ **Health Prediction**
  - Comprehensive input form (symptoms, age, weight, allergies, duration)
  - AI-powered analysis using Groq API
  - Automatic retry with exponential backoff on rate limits
  - Real-time prediction results

- ✅ **Prediction Management**
  - Save predictions to MongoDB
  - View complete prediction history
  - Delete individual predictions
  - Chronologically sorted by creation date

- ✅ **User Experience**
  - Responsive design (mobile, tablet, desktop)
  - Loading states and error handling
  - Clean, modern UI with shadcn/ui components
  - Intuitive navigation

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14.2.5** - React framework with App Router
- **TypeScript 5.5.3** - Type-safe development
- **Tailwind CSS 3.4.7** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js Server Actions** - Type-safe server-side operations
- **MongoDB 6.3.0** - NoSQL database (official driver)
- **bcryptjs 2.4.3** - Password hashing

### AI & APIs
- **Groq API** - Ultra-fast LLM inference (Llama 3.1 8B Instant)
- **Automatic Retry Logic** - Exponential backoff for rate limits

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS & Autoprefixer** - CSS processing

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** database ([MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local instance)
- **Groq API Key** ([Get it free](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd SoftwareEngMiniProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health-prediction
   GROQ_API_KEY=your_groq_api_key_here
   ```
   
   > 💡 **Tip**: Use `env.template` as a reference. Get your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and Groq API key from [Groq Console](https://console.groq.com/).

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
SoftwareEngMiniProject/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── login/               # Login page
│   │   └── page.tsx
│   ├── predict/             # Prediction page
│   │   └── page.tsx
│   └── history/             # History page
│       └── page.tsx
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   └── navbar.tsx           # Navigation component
├── lib/                     # Server-side utilities
│   ├── auth.ts              # Authentication logic
│   ├── db.ts                # MongoDB connection
│   ├── groq.ts              # Groq API integration
│   ├── predictions.ts       # Prediction server actions
│   ├── proxy.ts             # Proxy utility
│   └── utils.ts             # Helper functions
├── types/                   # TypeScript type definitions
│   └── index.ts             # User & Prediction interfaces
├── public/                  # Static assets
├── middleware.ts            # Next.js middleware
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies & scripts
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `GROQ_API_KEY` | Groq API key for AI predictions | ✅ Yes |

### MongoDB Setup

**Option 1: MongoDB Atlas (Cloud - Recommended)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string from "Connect" → "Connect your application"
4. Replace `<password>` with your database password

**Option 2: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/health-prediction
```

### Groq API Setup

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up for a free account
3. Navigate to "API Keys"
4. Create a new API key
5. Copy and paste it into your `.env.local` file

---

## 📚 Usage Guide

### 1. Registration & Login

1. Navigate to the login page
2. Click "Don't have an account? Register"
3. Enter your email and password (minimum 6 characters)
4. Click "Register" to create your account
5. You'll be automatically logged in and redirected

### 2. Making Predictions

1. Go to the **Predict** page (or click "Get Prediction" on homepage)
2. Fill in the required information:
   - **Symptoms** (required): Describe your symptoms
   - **Age** (optional): Your age in years
   - **Weight** (optional): Your weight in kg
   - **Allergies** (optional): Any known allergies
   - **Duration** (optional): How long you've had these symptoms
3. Click **"Get Prediction"**
4. Wait for the AI to analyze (usually 2-5 seconds)
5. View your prediction result

### 3. Viewing History

1. Click **"History"** in the navigation bar
2. Browse all your saved predictions
3. Click the trash icon to delete any prediction
4. Predictions are sorted by most recent first

---

## 🏗️ Architecture

### Server Actions

The application uses Next.js Server Actions for type-safe server-side operations:

- **`savePrediction()`** - Saves a new prediction with AI analysis
- **`getUserPredictions()`** - Retrieves all predictions for the current user
- **`deletePrediction()`** - Deletes a specific prediction
- **`registerUser()`** - Creates a new user account
- **`loginUser()`** - Authenticates a user
- **`getCurrentUser()`** - Gets the current authenticated user

### Data Flow

```
User Input → Server Action → Groq API → MongoDB → JSON Serialization → Frontend
```

### Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ HTTP-only cookies for session management
- ✅ Protected routes with authentication checks
- ✅ User-specific data isolation (userId filtering)
- ✅ Input validation and error handling

---

## 🔍 API Integration

### Groq API

The application integrates with Groq's API for AI-powered predictions:

- **Model**: `llama-3.1-8b-instant`
- **Temperature**: 0.7
- **Max Tokens**: 500
- **Retry Logic**: 5 attempts with exponential backoff
- **Rate Limit Handling**: Automatic retry on 429 errors

### MongoDB Collections

**Users Collection**
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  createdAt: Date
}
```

**Predictions Collection**
```typescript
{
  _id: ObjectId,
  userId: string,
  symptoms: string,
  age?: number,
  weight?: number,
  allergies?: string,
  duration?: string,
  result: string,
  createdAt: Date
}
```

---

## 🐛 Troubleshooting

### Common Issues

**❌ "MONGODB_URI is not set"**
- Ensure `.env.local` exists in the root directory
- Check that the variable name is exactly `MONGODB_URI`
- Restart the development server after adding environment variables

**❌ "GROQ_API_KEY is not set"**
- Verify your API key is correct in `.env.local`
- Make sure there are no extra spaces or quotes around the key
- Restart the server after updating

**❌ "Port 3000 is already in use"**
```bash
# Use a different port
npm run dev -- -p 3001
```

**❌ "Failed to connect to MongoDB"**
- Check your MongoDB connection string
- Ensure your IP is whitelisted (MongoDB Atlas)
- Verify your database credentials

**❌ "Rate limit exceeded"**
- The app automatically retries up to 5 times
- Wait a few minutes and try again
- Consider upgrading your Groq API plan

**❌ TypeScript compilation errors**
- Run `npm install` to ensure all dependencies are installed
- Check that all types are properly imported
- Verify `tsconfig.json` is correctly configured

---

## 🧪 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Consistent formatting with Prettier (if configured)

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review the [SETUP.md](./SETUP.md) for detailed setup instructions
3. Open an issue on GitHub

---

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] Export predictions to PDF
- [ ] Email notifications for saved predictions
- [ ] Multi-language support
- [ ] Advanced filtering and search
- [ ] Prediction analytics and insights
- [ ] Integration with health tracking devices
- [ ] User profile management
- [ ] Dark mode toggle

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and Groq AI**

⭐ Star this repo if you find it helpful!

</div>
