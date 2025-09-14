import React from "react";
import { Link } from "react-router-dom";
import "../styles/main.scss";

const Header = () => {
  return (
    <header className="header">
      <h1>Dobrodošli — Neoplanta Bookstore</h1>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Početna</Link></li>
          <li><Link to="/publishers">Publishers</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/create-movie">Create book</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
