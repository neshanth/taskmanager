import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Login from "../login/Login";
import Spinner from "../spinner/Spinner";

function Home() {
  const [auth, checkAuth, loading, user] = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {auth ? (
        <h2>Welcome {user}</h2>
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
