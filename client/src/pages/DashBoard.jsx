import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [habits, setHabits] = useState([]);
    const navigate = useNavigate();

    const fetchHabits = async () => {
        try {
            const res = await API.get("/habits");
            setHabits(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    };

    const checkIn = async (habitId) => {
        try {
            await API.put(`/habits/${habitId}/check`);
            fetchHabits(); // Refresh the list
        } catch (err) {
            alert("Already checked in or error occurred.");
        }
    };

    const deleteHabit = async (habitId) => {
        try {
            await API.delete(`/habits/${habitId}`);
            fetchHabits(); // Refresh the list after deletion
        } catch (err) {
            console.error("Error deleting habit:", err);
            alert("Error deleting habit. Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    const viewHistory = async (habitId) => {
        navigate(`/history/${habitId}`);
    };

    useEffect(() => {
        fetchHabits();
    }, []);


    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto bg-blue-400 min-w-screen max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Your Habits</h1>
            <button
                className="mr-3 bg-green-500 text-white px-4 py-2 rounded mb-6 hover:bg-green-600"
                onClick={() => navigate("/create")}
            >
                + Add New Habit
            </button>
            <button
                className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600"
                onClick={handleLogout}
            >
                Logout
            </button>

            {habits.length === 0 ? (
                <p className="text-gray-600">No habits yet. Start by adding one!</p>
            ) : (
                <ul className="space-y-4">
                    {habits.map((habit) => (
                        <li
                            key={habit.id}
                            className="p-4 card border rounded-xl shadow flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{habit.title}</h3>
                                <p className="text-sm text-gray-600">
                                    Last Check-in:{" "}
                                    {habit.last_checkin_date
                                        ? new Date(habit.last_checkin_date).toDateString()
                                        : "Never"}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => checkIn(habit.id)}
                                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                >
                                    Check In
                                </button>
                                <button
                                    onClick={() => viewHistory(habit.id)}
                                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                >
                                    History
                                </button>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                >
                                    Delete
                                </button></div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
