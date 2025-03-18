"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AIAdvice({ bmi, category }) {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const getAdvice = async () => {
    setLoading(true);
    setAdvice("");

    try {
      const res = await fetch("/api/fitness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bmi, category }),
      });

      if (!res.ok) throw new Error("Failed to fetch advice");

      const data = await res.json();
      setAdvice(data.message);
    } catch (error) {
       console.error("Error:", error);
      setAdvice("Sorry, we couldn't fetch advice at this time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={getAdvice}
        className="bg-green-500 hover:bg-green-600 w-full"
        disabled={loading}
      >
        {loading ? "Generating AI Advice..." : "Get AI-Powered Fitness Advice"}
      </Button>

      {advice && (
        <p className="mt-4 p-3 bg-gray-700 text-white rounded-xl text-center">{advice}</p>
      )}
    </div>
  );
}
