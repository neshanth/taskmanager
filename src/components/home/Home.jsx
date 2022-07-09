import React from "react";
import Login from "../login/Login";

function Home() {
  let auth = localStorage.getItem("isAuth") === "true";
  let { name } = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      {auth ? (
        <h2>Welcome {name} </h2>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Login />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
