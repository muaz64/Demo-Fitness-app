import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import AIAdvice from "./AIAdvice";

export default function Page() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const calculateBMI = async () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
    const bmiCategory =
      bmiValue < 18.5
        ? "Underweight"
        : bmiValue < 24.9
        ? "Normal weight"
        : bmiValue < 29.9
        ? "Overweight"
        : "Obese";
    setCategory(bmiCategory);
    generateRecommendation(bmiValue, goal);
  };

  const generateRecommendation = (bmiValue, goal) => {
    let rec = "";
    if (bmiValue < 18.5) {
      rec += "Focus on strength training and a high-protein diet. ";
    } else if (bmiValue < 24.9) {
      rec += "Maintain your weight with balanced workouts. ";
    } else if (bmiValue < 29.9) {
      rec += "Include cardio and moderate strength training to reduce weight. ";
    } else {
      rec += "Start with low-impact cardio and consult a healthcare professional. ";
    }

    if (goal === "lose") rec += "Prioritize calorie deficit and HIIT workouts.";
    else if (goal === "gain") rec += "Add resistance training and a calorie surplus diet.";
    else rec += "Focus on balanced routines to maintain your fitness level.";

    setRecommendation(rec);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Achieve Your Fitness Goals</h1>
        <p className="text-lg text-gray-400 mt-2">Workout plans tailored for you</p>
      </header>

      {/* Input Section */}
      <Card className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg text-black">
        <CardContent>
          <h2 className="text-2xl text-center font-semibold mb-4">Enter Your Details</h2>
          <div className="flex flex-col gap-4">
            <Input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <Input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
            <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="custom-input text-center">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="custom-input text-center">
              <option value="">Select Goal</option>
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Muscle</option>
              <option value="maintain">Maintain Fitness</option>
            </select>
            <Button onClick={calculateBMI} className="bg-blue-500 hover:bg-blue-600 w-full">
              Calculate BMI & Get Advice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* BMI & Recommendations */}
      {bmi && (
        <Card className="max-w-md mx-auto mt-6 p-6 bg-gray-800/80 backdrop-blur rounded-2xl shadow-lg text-black">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Your Results</h2>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="text-lg">BMI: {bmi} ({category})</p>
              <p className="text-md text-gray-400 mt-2">{recommendation}</p>
              <AIAdvice bmi={bmi} category={category} /> {/* AI Personalized Advice Section */}
            </motion.div>
          </CardContent>
        </Card>
      )}

      <div className="border-t border-gray-700 my-12"></div>

      <section className="text-center">
        <h2 className="text-3xl font-bold">🏋️ Workout Plans</h2>
        <p className="text-gray-200 mt-2">Choose from expertly designed fitness programs.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-black">
          {['Beginner Plan', 'Intermediate Plan', 'Advanced Plan'].map((plan, index) => (
            <Card key={index} className="p-4 bg-gray-800/60 rounded-xl">
              <CardContent>
                <h3 className="text-xl font-semibold">{plan}</h3>
                <p className="text-gray-800 mt-2">Tailored exercises for {plan.toLowerCase()} level.</p>
                <Button className="mt-4 bg-blue-500 w-full">Join Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-700 my-12"></div>

      <section className="text-center">
        <h2 className="text-3xl font-semibold">👩‍🏫 Meet Our Trainers</h2>
        <p className="text-gray-400 mt-2">Certified professionals to guide your journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-black">
          {['Alex', 'Jordan', 'Taylor'].map((trainer, index) => (
            <Card key={index} className="p-4 bg-gray-800/60 rounded-xl">
              <CardContent>
                <h3 className="text-xl font-semibold">{trainer}</h3>
                <p className="text-gray-800 mt-2">Expert in personal training & nutrition.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="border-t border-gray-700 my-12"></div>

      <section className="text-center">
        <h2 className="text-3xl font-semibold">💬 Client Testimonials</h2>
        <p className="text-gray-200 mt-2">Hear success stories from our happy clients.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {['"Lost 10kg in 3 months!"', '"My energy levels are at an all-time high!"'].map((testimonial, index) => (
            <Card key={index} className="p-4 bg-gray-800/60 rounded-xl">
              <CardContent>
                <p className="italic text-gray-600">{testimonial}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}