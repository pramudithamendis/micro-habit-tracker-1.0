import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import CreateHabit from "./pages/CreateHabit";
import ViewHistory from "./pages/ViewHistory";
import "./index.css";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/create"
        element={
          <RequireAuth>
            <CreateHabit />
          </RequireAuth>
        }
      />
      <Route
        path="/history/:id"
        element={
          <RequireAuth>
            <ViewHistory />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
