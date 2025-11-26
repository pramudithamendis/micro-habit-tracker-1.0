import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [mode, setMode] = useState("login"); // or "register"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const route = mode === "login" ? "/auth/login" : "/auth/register";
      const res = mode === "login" ? await API.post(route, { email, password }) : await API.post(route, { name, email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Unexpected response.");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const register = (
    <>
      <input type="text" className="w-full mb-3 p-2 border rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />

      <input type="text" className="w-full mb-3 p-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" className="w-full mb-4 p-2 border rounded" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </>
  );

  const login = (
    <>
      <input type="text" className="w-full mb-3 p-2 border rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" className="w-full mb-4 p-2 border rounded" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">{mode === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {mode === "login" ? login : register}

          <button type="submit" className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <div className="text-center mt-4">
          {mode === "login" ? (
            <p>
              Don't have an account?{" "}
              <button className="text-blue-500 underline" onClick={() => setMode("register")}>
                Register
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button className="text-blue-500 underline" onClick={() => setMode("login")}>
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
