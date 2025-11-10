import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Provera tokena u AuthProvider:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);

        if (decoded.role && decoded.role.includes("Editor")) {
          setIsEditor(true);
          setRole("Editor");
        } else {
          setIsEditor(false);
          setRole(decoded.role);
        }

        console.log("Decoded user:", decoded);
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

    if (decoded.role && decoded.role.includes("EDITOR")) {
      setIsEditor(true);
      setRole("Editor");
    } else {
      setIsEditor(false);
      setRole(decoded.role);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsEditor(false);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, role, isEditor, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
