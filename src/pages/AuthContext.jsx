import React, { createContext, useState } from "react";

// Create the Auth Context
export const AuthContext = createContext();

// Create the Auth Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [token, setToken] = useState("");

  // Function to update login status and token
  const login = (token) => {
    setIsLoggedIn(token);
    setToken(token);
  };

  React.useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  // Function to logout
  const logout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("token");
  };

  // Value object to be passed to consumers
  const authContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
