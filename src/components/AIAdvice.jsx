import { useState } from 'react';
import axios from 'axios';

const AIAdvice = ({ bmi, category }) => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo", // You can also use "gpt-4" if you have access
          messages: [
            { role: "system", content: "You are a fitness and nutrition expert." },
            {
              role: "user",
              content: `Give a detailed personalized workout and diet plan for a person with BMI ${bmi}, categorized as ${category}. Focus on safety and motivation.`,
            },
          ],
          max_tokens: 300, // Adjust tokens based on how much detail you want
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `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` // ⚠️ Replace this with your real API key (Demo only)
          },
        }
      );

      setAdvice(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error fetching AI advice:", error);
      setAdvice("Failed to get advice. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-md text-white">
      <button
        onClick={getAdvice}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg w-full"
      >
        {loading ? "Fetching AI Advice..." : "Get Personalized AI Advice"}
      </button>

      {advice && (
        <div className="mt-4 text-left whitespace-pre-line">
          <h3 className="font-semibold mb-2 text-xl">Personalized Plan:</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default AIAdvice;
