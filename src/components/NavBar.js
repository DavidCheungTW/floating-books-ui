import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

const NavBar = ({ loginID, onLogin, onLogout }) => {
  return (
    <div className="navbar">
      <ul className="navbar-links">
        <li className="navbar-links-item">
          <Link className="item" to="/">
            View Books
          </Link>
        </li>
        <li className="navbar-links-item">
          <Link className="item" to="favourite-books">
            Favourite Books
          </Link>
        </li>
        <li className="navbar-links-item">
          <Link className="item" to="order-books">
            Order Books
          </Link>
        </li>
        <li className="navbar-links-item">
          <Link className="item" to="register-book">
            Register a Book
          </Link>
        </li>
        {!loginID && (
          <li className="navbar-links-item signin-button">
            <Link className="item" to="signin">
              Sign in
            </Link>
          </li>
        )}
        {loginID && (
          <button type="submit" className="signout-button" onClick={onLogout}>
            Sign out
          </button>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
