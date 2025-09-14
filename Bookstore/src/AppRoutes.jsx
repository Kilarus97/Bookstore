// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import PublishersPage from "./components/PublishersPage/PublishersRender&HTTP.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publishers" element={<PublishersPage />}/>
    </Routes>
  );
};

export default AppRoutes;
