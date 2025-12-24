import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      age,
      gender,
      height,
      weight,
      goal,
      level,
      location,
      diet,
      medical,
      stress,
    } = body;

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const prompt = `
You are a professional AI fitness coach.

Generate a personalized fitness plan in STRICT JSON FORMAT ONLY.

User details:
Name: ${name}
Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
Fitness Goal: ${goal}
Fitness Level: ${level}
Workout Location: ${location}
Diet Preference: ${diet}
Medical History: ${medical || "None"}
Stress Level: ${stress || "Not specified"}

Return JSON in exactly this structure (NO extra text):

{
  "workout_plan": {
    "overview": "short paragraph",
    "days": [
      {
        "day": "Day 1",
        "focus": "focus area",
        "exercises": [
          {
            "name": "Exercise name",
            "sets": "3",
            "reps": "10-12",
            "rest": "60 sec"
          }
        ]
      }
    ]
  },
  "diet_plan": {
    "overview": "short paragraph",
    "meals": {
      "breakfast": ["item"],
      "lunch": ["item"],
      "dinner": ["item"],
      "snacks": ["item"]
    }
  },
  "tips": ["tip 1", "tip 2"],
  "motivation": "short motivational line"
}

Rules:
- DO NOT add markdown
- DO NOT add explanations
- DO NOT add text outside JSON
- Keep output realistic and safe
`;

    // 🔴 THIS TRY-CATCH IS IMPORTANT
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const jsonStart = response.indexOf("{");
      const jsonEnd = response.lastIndexOf("}");
      const jsonString = response.slice(jsonStart, jsonEnd + 1);

      const parsed = JSON.parse(jsonString);

      return NextResponse.json(parsed);
    } catch (aiError: any) {
      // ✅ HANDLE QUOTA / RATE LIMIT
      if (aiError?.status === 429) {
        return NextResponse.json(
          { error: "AI quota exceeded. Please try again later." },
          { status: 429 }
        );
      }

      // Any other Gemini error
      console.error("Gemini AI error:", aiError);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
