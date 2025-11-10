import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "../styles/main.scss";

const Header = () => {
  const { isEditor,isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="header"> 
      <h1>Dobrodošli — Neoplanta Bookstore</h1>
      <nav>
        <ul className="nav-list">
          <li><Link to="/">Početna</Link></li>
          <li><Link to="/publishers">Publishers</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/create-book">Add new Book</Link></li>

          {!isEditor ? null : (
            <>
              <li><Link to="/volumes">Pretraga tomova</Link></li>
              <li><Link to="/issues">Pretraga izdanja</Link></li>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="logout-btn">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
