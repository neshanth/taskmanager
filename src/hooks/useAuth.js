import { useContext, useState } from "react";
import { UserContext } from "../context";
import api from "../api/api";

export const useAuth = () => {
  const { auth, setAuth, setUser, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/api/user");
      const { name, email } = response.data;
      setAuth(true);
      setUser(name);
      setLoading(false);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", JSON.stringify({ name, email }));
    } catch (err) {
      setLoading(false);
      setAuth(false);
      localStorage.removeItem("isAuth");
    }
  };
  return [auth, checkAuth, loading, user];
};
