// src/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import PublishersPage from "./components/PublishersPage/PublishersRender&HTTP.jsx";
import BooksPage from "./components/BooksPage/BooksRender&HTTP.jsx";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publishers" element={<PublishersPage />} />
      <Route path="/books" element={<BooksPage />} />
    </Routes>
  );
};

export default AppRoutes;
