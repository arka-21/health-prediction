# 🚀 Complete Setup Guide - Step by Step Instructions

This guide will walk you through setting up the Smart Health Prediction System from scratch. Follow each step carefully.

---

## ⚡ Quick Start (If You Already Have Node.js Installed)

If you already have Node.js and npm installed, here's the quick version:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Open `.env.local` file (already created for you)
   - Add your MongoDB connection string
   - Add your Groq API key
   - See **STEP 5** for detailed instructions

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   - Go to: http://localhost:3000

**Need help?** Continue reading the detailed guide below.

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] A computer with Windows/Mac/Linux
- [ ] Internet connection
- [ ] A web browser (Chrome, Firefox, Edge, etc.)
- [ ] A text editor (VS Code recommended, but Notepad works too)

---

## STEP 1: Install Node.js (If Not Already Installed)

### 1.1 Check if Node.js is Already Installed

1. Open **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter
   - **Linux**: Press `Ctrl + Alt + T`

2. Type this command and press Enter:
   ```bash
   node --version
   ```

3. If you see a version number (like `v18.17.0` or `v20.10.0`), **SKIP to STEP 2**
4. If you see an error like "command not found", continue to Step 1.2

### 1.2 Download and Install Node.js

1. **Go to the Node.js website:**
   - Open your browser
   - Visit: https://nodejs.org/
   - You'll see two download buttons: **LTS** (recommended) and **Current**

2. **Download Node.js:**
   - Click the **LTS** button (it's the stable version)
   - The installer will download automatically

3. **Install Node.js:**
   - **Windows**: Double-click the downloaded `.msi` file and follow the installation wizard
     - ✅ Check "Automatically install the necessary tools"
     - Click "Next" through all steps
     - Click "Install" (you may need to allow administrator access)
   - **Mac**: Double-click the downloaded `.pkg` file and follow the installation wizard
   - **Linux**: Use your package manager or follow Linux-specific instructions

4. **Verify Installation:**
   - Close and reopen your Command Prompt/Terminal
   - Type these commands one by one:
     ```bash
     node --version
     npm --version
     ```
   - Both should show version numbers
   - If they don't work, restart your computer and try again

---

## STEP 2: Install Project Dependencies

### 2.1 Open Terminal in Project Folder

1. **Navigate to your project folder:**
   - The project folder is: `C:\Users\HP\Desktop\proj`
   - Open Command Prompt/Terminal
   - Type this command and press Enter:
     ```bash
     cd C:\Users\HP\Desktop\proj
     ```
   - **OR** if you're on Mac/Linux:
     ```bash
     cd ~/Desktop/proj
     ```

2. **Verify you're in the right folder:**
   - Type: `dir` (Windows) or `ls` (Mac/Linux)
   - You should see files like `package.json`, `tsconfig.json`, etc.

### 2.2 Install All Dependencies

1. **Run the installation command:**
   ```bash
   npm install
   ```

2. **Wait for installation to complete:**
   - This may take 2-5 minutes
   - You'll see lots of text scrolling
   - Wait until you see a message like "added 500 packages" or similar
   - Don't worry about warnings (yellow text) - they're usually fine

3. **If you see errors:**
   - **Error: "npm is not recognized"**: Go back to STEP 1 and install Node.js
   - **Error: "EACCES" or permission errors**: 
     - **Windows**: Right-click Command Prompt, select "Run as Administrator", then try again
     - **Mac/Linux**: Try `sudo npm install` (enter your password when asked)

---

## STEP 3: Set Up MongoDB Database

You have two options: **Local MongoDB** (on your computer) or **MongoDB Atlas** (cloud, free, easier).

### Option A: MongoDB Atlas (Cloud - RECOMMENDED for Beginners) ⭐

#### 3A.1 Create MongoDB Atlas Account

1. **Go to MongoDB Atlas:**
   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Click "Try Free" or "Sign Up"

2. **Create Account:**
   - Enter your email and create a password
   - Verify your email address

3. **Create a Free Cluster:**
   - After logging in, you'll see "Create a Deployment"
   - Select **"M0 FREE"** (it's free forever)
   - Choose a cloud provider (AWS, Google Cloud, or Azure - doesn't matter)
   - Choose a region closest to you
   - Click "Create Deployment"
   - Wait 3-5 minutes for the cluster to be created

#### 3A.2 Set Up Database Access

1. **Create Database User:**
   - You'll see a popup "Create Database User"
   - Enter a username (e.g., `healthapp`)
   - Enter a password (save this password!)
   - Click "Create Database User"
   - Click "Finish and Close"

2. **Set Network Access:**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"
   - Wait 1-2 minutes for it to activate

#### 3A.3 Get Your Connection String

1. **Click "Connect" button** on your cluster
2. **Choose "Connect your application"**
3. **Copy the connection string:**
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`
   - **IMPORTANT**: Replace `<password>` with your actual database password
   - Replace `<dbname>` with `health-prediction`
   - Example: `mongodb+srv://healthapp:mypassword123@cluster0.xxxxx.mongodb.net/health-prediction`

### Option B: Local MongoDB (Advanced)

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Download for your operating system
   - Install it following the installer instructions

2. **Start MongoDB:**
   - **Windows**: MongoDB should start automatically as a service
   - **Mac/Linux**: Run `mongod` in terminal

3. **Use this connection string:**
   ```
   mongodb://localhost:27017/health-prediction
   ```

---

## STEP 4: Get Groq API Key

### 4.1 Create Groq Account

1. **Go to Groq Console:**
   - Visit: https://console.groq.com/
   - Click "Sign Up" or "Get Started"

2. **Create Account:**
   - Sign up with your email or Google account
   - Verify your email if needed

### 4.2 Get API Key

1. **Navigate to API Keys:**
   - After logging in, look for "API Keys" in the sidebar or dashboard
   - Click on it

2. **Create New API Key:**
   - Click "Create API Key" or "New API Key"
   - Give it a name (e.g., "Health Prediction App")
   - Click "Create" or "Generate"
   - **COPY THE API KEY IMMEDIATELY** - you won't see it again!
   - It looks like: `gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

3. **Save the API Key:**
   - Paste it somewhere safe (like a text file)
   - You'll need it in the next step

---

## STEP 5: Configure Environment Variables

### 5.1 Locate the .env.local File

1. **Navigate to your project folder:**
   - Go to: `C:\Users\HP\Desktop\proj`
   - Look for a file named `.env.local`
   - **Note**: A template file has been created for you! If you don't see `.env.local`, look for `env.template` and copy it to `.env.local`
   - If you still don't see it, it might be hidden (files starting with `.` are often hidden)
     - **Windows**: In File Explorer, go to View → Show → Hidden items
     - **Mac**: Press `Cmd + Shift + .` to show hidden files

2. **Open the file:**
   - **Windows**: Right-click → Open with → Notepad (or VS Code if you have it)
   - **Mac**: Right-click → Open With → TextEdit
   - **Linux**: Use any text editor

### 5.2 Fill in Your Values

1. **Find the `MONGODB_URI` line:**
   - If using **MongoDB Atlas**: Replace the entire line with your connection string from Step 3A.3
     ```
     MONGODB_URI=mongodb+srv://healthapp:yourpassword@cluster0.xxxxx.mongodb.net/health-prediction
     ```
   - If using **Local MongoDB**: Keep it as is:
     ```
     MONGODB_URI=mongodb://localhost:27017/health-prediction
     ```

2. **Find the `GROQ_API_KEY` line:**
   - Replace `your_groq_api_key_here` with the API key you copied in Step 4.2
     ```
     GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     ```

3. **Save the file:**
   - Press `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac)
   - Make sure the file is saved as `.env.local` (not `.env.local.txt`)

### 5.3 Verify Your .env.local File

Your file should look something like this (with YOUR actual values):

```env
MONGODB_URI=mongodb+srv://healthapp:mypassword123@cluster0.abc123.mongodb.net/health-prediction
GROQ_API_KEY=gsk_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

**Important Notes:**
- ✅ No spaces around the `=` sign
- ✅ No quotes around the values (unless your password has special characters)
- ✅ Make sure there are no extra spaces at the end of lines
- ✅ The file must be named exactly `.env.local` (not `.env` or `.env.local.txt`)

---

## STEP 6: Run the Development Server

### 6.1 Open Terminal in Project Folder

1. **Open Command Prompt/Terminal** (same as Step 2.1)
2. **Navigate to project folder:**
   ```bash
   cd C:\Users\HP\Desktop\proj
   ```

### 6.2 Start the Server

1. **Run the development command:**
   ```bash
   npm run dev
   ```

2. **Wait for the server to start:**
   - You'll see messages like:
     ```
     ▲ Next.js 14.2.5
     - Local:        http://localhost:3000
     - Ready in 2.3s
     ```
   - **Don't close this window!** The server needs to keep running

3. **If you see errors:**
   - **Error: "Cannot find module"**: Run `npm install` again (Step 2.2)
   - **Error: "MONGODB_URI is not set"**: Check your `.env.local` file (Step 5)
   - **Error: "Port 3000 is already in use"**: 
     - Close other applications using port 3000, OR
     - Change the port by running: `npm run dev -- -p 3001`

---

## STEP 7: Open the Application

### 7.1 Open in Browser

1. **Open your web browser** (Chrome, Firefox, Edge, etc.)

2. **Go to:**
   ```
   http://localhost:3000
   ```

3. **You should see:**
   - The Health Prediction System homepage
   - A navigation bar at the top
   - "Get Prediction" and "View History" buttons

### 7.2 Test the Application

1. **Create an Account:**
   - Click "Login" in the top right
   - Click "Don't have an account? Register"
   - Enter an email and password (at least 6 characters)
   - Click "Register"
   - You should be redirected to the Predict page

2. **Make a Prediction:**
   - Fill in the symptoms (e.g., "Headache and fever for 2 days")
   - Optionally fill in age, weight, allergies, duration
   - Click "Get Prediction"
   - Wait a few seconds for the AI to analyze
   - You should see a prediction result

3. **View History:**
   - Click "History" in the navigation bar
   - You should see your prediction listed

---

## 🎉 Success! You're All Set!

Your Health Prediction System is now running! Here's what you can do:

### Daily Usage:
- **Start the server**: Open terminal, `cd` to project folder, run `npm run dev`
- **Stop the server**: Press `Ctrl + C` in the terminal
- **Access the app**: Open `http://localhost:3000` in your browser

### Troubleshooting:

**Problem: "Cannot connect to MongoDB"**
- Check your MongoDB connection string in `.env.local`
- Make sure MongoDB Atlas cluster is running (if using Atlas)
- Make sure local MongoDB is running (if using local)

**Problem: "Groq API error"**
- Check your API key in `.env.local`
- Make sure you copied the entire key
- Try generating a new API key from Groq console

**Problem: "Page not loading"**
- Make sure the development server is running (`npm run dev`)
- Check the terminal for error messages
- Try refreshing the browser (F5)

**Problem: "Module not found" errors**
- Delete the `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again

### Need Help?
- Check the terminal/console for error messages
- Make sure all environment variables are set correctly
- Verify Node.js and npm are installed correctly

---

## 📝 Quick Reference Commands

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for code errors
npm run lint
```

---

## 🔒 Security Notes

- **Never commit `.env.local` to Git** - it contains sensitive information
- **Don't share your API keys** with anyone
- **Use strong passwords** for your MongoDB database user
- **In production**, use environment variables from your hosting provider

---

**You're ready to go! Happy coding! 🚀**
