import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

export default function ViewHistory() {
    const { id } = useParams();
    const [habit, setHabit] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const habitRes = await API.get(`/habits/${id}`);
                const historyRes = await API.get(`/habits/${id}/history`);
                setHabit(habitRes.data);
                setHistory(historyRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [id]);

    if (!habit) return <p>Loading...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto shadow rounded min-w-screen min-h-screen bg-blue-400">
            <h1 className="text-2xl font-bold mb-4">{habit.title}</h1>
            {/* <p className="text-gray-600 mb-4">
                Last Check-in: {habit.last_checkin_date
                    ? new Date(habit.last_checkin_date).toDateString()
                    : "Never"}
            </p> */}

            <h2 className="text-xl font-semibold mb-2">Check-in History</h2>
            {history.length === 0 ? (
                <p className="text-gray-500">No history yet.</p>
            ) : (
                <ul className="list-disc pl-5 text-gray-700">
                    {history.map((entry, index) => (
                        <li key={index}>
                            {new Date(entry.checkin_date).toDateString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

