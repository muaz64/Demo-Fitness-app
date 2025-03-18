import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env file
});

export async function POST(req) {
  try {
    const { bmi, category } = await req.json();

    const prompt = `
    I am a fitness expert. Based on a BMI of ${bmi} categorized as ${category}, give me personalized fitness advice. 
    Consider goals like weight loss, muscle gain, or maintaining health. Provide clear, actionable suggestions.
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 200,
    });

    const aiResponse = chatCompletion.choices[0].message.content.trim();
    return NextResponse.json({ message: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Failed to generate advice" }, { status: 500 });
  }
}
