import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import "./app.css";
import Home from "./components/home/Home";
import PrivateRoute from "./components/privateroute/PrivateRoute";
import Register from "./components/register/Register";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./hooks/useAuth";
import api from "./api/api";
import Spinner from "./components/spinner/Spinner";
import { useEffect, useState } from "react";

function App() {
  const [auth, checkAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/api/logout", {});
      setLoading(false);
      checkAuth();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Navbar logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
