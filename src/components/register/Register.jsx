import React, { useState, useContext } from "react";
import { UserContext } from "../../context";
import api from "../../api/api";
import Spinner from "../spinner/Spinner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { loading, setLoading } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/register", { name, email, password });
      setLoading(false);
      clearInputs();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-6">
          <form className="register-form" onSubmit={handleRegister} method="POST">
            <h2 className="text-center">Register</h2>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input type="name" name="name" className="form-control border--primary" onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="form-control border--primary" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control border--primary" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <button className="btn btn-custom-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
