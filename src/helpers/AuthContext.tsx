import React, { createContext, useState } from "react";
interface AuthContextType {
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

// Create the Auth Provider
export const AuthProvider: any = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>();
  const [token, setToken] = useState("");

  // Function to update login status and token
  const login = (token: string) => {
    setIsLoggedIn(true);
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
  const authContextValue: AuthContextType = {
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
