
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function  Page() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);
    setCategory(
      bmiValue < 18.5
        ? "Underweight"
        : bmiValue < 24.9
        ? "Normal weight"
        : bmiValue < 29.9
        ? "Overweight"
        : "Obese"
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Achieve Your Fitness Goals</h1>
        <p className="text-lg text-gray-400 mt-2">Workout plans tailored for you</p>
      </header>

      {/* Step 1: Input weight and height */}
      <Card className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Step 1: Enter Your Details</h2>
          <div className="flex flex-col gap-4">
            <Input
              type="number"
              placeholder="Enter Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Enter Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Click to calculate BMI */}
      <Card className="max-w-md mx-auto mt-6 p-6 bg-gray-800 rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Step 2: Calculate Your BMI</h2>
          <Button onClick={calculateBMI} className="bg-blue-500 hover:bg-blue-600 w-full">
            Calculate BMI
          </Button>
        </CardContent>
      </Card>

      {/* Step 3: Display BMI result */}
      {bmi && (
        <Card className="max-w-md mx-auto mt-6 p-6 bg-gray-800 rounded-2xl shadow-lg">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Step 3: View Your Results</h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <p className="text-lg font-semibold">Your BMI: {bmi}</p>
              <p className="text-sm text-gray-400">Category: {category}</p>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Workout Plans */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">Workout Plans</h2>
        <p className="text-gray-400 mt-2">Choose from our expertly designed plans</p>
      </section>

      {/* Trainers Section */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">Meet Our Trainers</h2>
        <p className="text-gray-400 mt-2">Certified professionals to guide you</p>
      </section>

      {/* Testimonials */}
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">What Our Clients Say</h2>
        <p className="text-gray-400 mt-2">Success stories from our happy clients</p>
      </section>
    </div>
  );
}


