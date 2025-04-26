import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function createHabit() {
  const [habitName, setHabitName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/habits", { title: habitName });
      if (res.status === 201) {
        navigate("/dashboard"); // Go back to Dashboard after success
      }
    } catch (err) {
      alert("Error adding habit. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto min-h-screen min-w-screen bg-blue-400 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Add New Habit</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded"
          placeholder="Enter habit name"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
}
