import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar({ logout }) {
  let auth = localStorage.getItem("isAuth") === "true";
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
