import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Provera tokena u AuthProvider:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("Decoded user:", user);
        setIsAuthenticated(true);
        
      } catch (err) {
        console.error("Nevalidan token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
