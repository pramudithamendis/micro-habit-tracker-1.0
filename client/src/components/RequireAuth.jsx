import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return children;
}
