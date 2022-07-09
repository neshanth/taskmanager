import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem("isAuth") === "true";
  return (
    <Route
      {...rest}
      render={() => {
        if (auth) {
          return children;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default PrivateRoute;
