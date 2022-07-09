import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import { UserContext } from "../../context";
import Spinner from "../spinner/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useContext(UserContext);
  let history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    api.get("/sanctum/csrf-cookie").then(() => {
      api
        .post("/api/login/", { email, password })
        .then((res) => {
          localStorage.setItem("isAuth", true);
          history.push("/dashboard");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form className="center-form" onSubmit={handleLogin}>
      <h2 className="text-center">Login</h2>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className="form-control border--primary" onChange={(e) => setEmail(e.target.value)} value={email} />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="form-control border--primary" onChange={(e) => setPassword(e.target.value)} value={password} />
      </div>
      <div className="mb-3 d-flex justify-content-center">
        <button className="btn btn-custom-primary">Login</button>
      </div>
    </form>
  );
};

export default Login;
