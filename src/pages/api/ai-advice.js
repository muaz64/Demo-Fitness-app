export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { bmi, category } = req.body;
  
    if (!bmi || !category) {
      return res.status(400).json({ error: "Missing BMI or category" });
    }
  
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // ✅ Secured using environment variable
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful fitness assistant." },
            {
              role: "user",
              content: `Give a personalized workout and diet advice for a person with BMI: ${bmi}, Category: ${category}. Make it simple, practical, and goal-oriented.`,
            },
          ],
          max_tokens: 200,
        }),
      });
  
      const data = await openaiResponse.json();
  
      if (openaiResponse.ok) {
        return res.status(200).json({ advice: data.choices[0].message.content });
      } else {
        console.error("OpenAI API error:", data);
        return res.status(500).json({ error: "Failed to fetch AI advice" });
      }
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }