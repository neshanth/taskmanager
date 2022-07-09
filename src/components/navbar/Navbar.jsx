import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./navbar.css";

function Navbar({ logout }) {
  const [auth] = useAuth();
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TaskLife
        </Link>
        <div className="login me-2">
          {!auth ? (
            <Link to="/register" className="mx-4">
              Register
            </Link>
          ) : (
            <button className="btn btn-primary mx-4" onClick={() => logout()}>
              Logout
            </button>
          )}
          {auth && <Link to="/dashboard">Dashboard</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
