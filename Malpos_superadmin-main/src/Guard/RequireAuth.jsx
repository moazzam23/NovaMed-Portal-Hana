import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

export default function RequireAuth({ children }) {
  let auth = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return children;
}
