import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  return <UserContext.Provider value={{ auth, user, setAuth, setUser, loading, setLoading, loggedIn, setLoggedIn }}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
