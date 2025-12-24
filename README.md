# AI Fitness Coach

AI Fitness Coach is a full-stack web application that generates **personalized workout and diet plans** using AI based on user details like age, goal, fitness level, diet preference, etc.  
The app focuses on **clean UX, real-world AI integration, and production-ready full-stack architecture**.

---

Live Link - https://ai-fitness-coach-99ra.vercel.app/

## Features

### Core Features
- **AI-generated personalized fitness plans**
- Workout plans with exercises, sets, reps & rest
- Diet plans with meal breakdowns
- **Export fitness plan as PDF**
- **Text-to-Speech** (Read workout & diet plans aloud)
- **Regenerate plan** anytime
- **Plan history** (locally saved)

### AI Image Generation
- Generate **exercise images** (e.g. “Barbell Squat”)
- Generate **meal images** (e.g. “Grilled Chicken Salad”)
- Implemented using **Pollinations AI** (free image generation)

### Authentication
- User **Signup & Login**
- Password hashing using bcrypt
- JWT-based authentication
- MongoDB for user storage

---

## Tech Stack

### Frontend
- **Next.js (App Router)**
- **React.js**
- **Tailwind CSS**
- Framer Motion (animations)

### Backend
- **Next.js API Routes**
- **Node.js**
- **MongoDB (Mongoose)**
- JWT Authentication

### AI & Utilities
- **Google Gemini API** (AI fitness plan generation)
- **Pollinations AI** (image generation)
- Web Speech API (Text-to-Speech)
- jsPDF (PDF export)

---


---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

▶️ How to Run Locally
1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/ai-fitness-coach.git
cd ai-fitness-coach
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Set environment variables
Create .env.local and add the required keys (see above).

4️⃣ Run the development server
```bash
npm run dev
```

5️⃣ Open in browser
```
http://localhost:3000
```

⚠️ Notes on AI Usage
Gemini API is used for text generation (fitness plan)
API rate limits are handled gracefully
Image generation uses Pollinations AI as a free alternative
If AI quota is exhausted, user-friendly error messages are shown

🙌 Author
Kartik Rathod
Full Stack Developer
GitHub: https://github.com/kartikrathod23

