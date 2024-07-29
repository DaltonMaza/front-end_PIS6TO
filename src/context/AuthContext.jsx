"use client"
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const loginUser = (authToken) => {
    setToken(authToken);

    localStorage.setItem("token", authToken)
  };

  const logoutUser = () => {
    setToken(null);

    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};