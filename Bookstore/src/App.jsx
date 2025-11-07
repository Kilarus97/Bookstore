// src/App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import "./styles/main.scss";
import Header from "./components/Header.jsx";
import { AuthProvider } from "./AuthContext.jsx"; // <-- koristi AuthProvider, ne AuthContext

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
