import { useEffect, useState } from "react";
import axios from "axios";

export default function AIAdvice({ bmi, category }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bmi && category) {
      getAdvice();
    }
  }, [bmi, category]);

  const getAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/ai-advice", { bmi, category });
      console.log("AI Advice:", response.data.advice);
      setAdvice(response.data.advice);
    } catch (error) {
      console.error("❌ Error fetching AI advice:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 p-4 bg-gray-800/70 rounded-xl text-white">
      <h3 className="text-lg font-semibold">AI-Powered Personalized Advice</h3>
      {loading ? (
        <p className="mt-2 text-gray-400 italic">Generating personalized advice...</p>
      ) : advice ? (
        <p className="mt-2 text-gray-300">{advice}</p>
      ) : (
        <p className="mt-2 text-gray-400 italic">No advice available.</p>
      )}
    </div>
  );
}
