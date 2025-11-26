import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import CreateHabit from "./pages/CreateHabit";
import ViewHistory from "./pages/ViewHistory";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<CreateHabit />} />
      <Route path="/history/:id" element={<ViewHistory />} />
    </Routes>
  );
}

export default App;
