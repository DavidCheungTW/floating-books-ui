import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "../styles/navbar.css";

const NavBar = ({ displayName, onLogin, onLogout }) => {
  return (
    <div className="navbar">
      <ul className="navbar-links">
        <Link className="item" to="/">
          View Books
        </Link>
        <Link className="item" to="favourite-books">
          Favourite Books
        </Link>
        <Link className="item" to="order-books">
          Order Books
        </Link>
        <Link className="item" to="followup-books">
          Follow Up Books
        </Link>
        <Link className="item" to="register-book">
          Register Book
        </Link>
        {!displayName && (
          <li className="navbar-links-item signin-button">
            {/* <Link className="item" to="signin">
              Sign in
            </Link> */}
            <Button
              component={Link}
              size="small"
              variant="outlined"
              className="item"
              to="signin"
            >
              Sign in
            </Button>
          </li>
        )}
        {displayName && (
          <Button
            size="small"
            variant="outlined"
            type="submit"
            className="signout-button"
            onClick={onLogout}
          >
            Sign out
          </Button>
        )}
        {/* {displayName && (
          <button
            type="submit"
            className="delete-account-button"
            onClick={onRemove}
          >
            Delete Account
          </button>
        )} */}
      </ul>
    </div>
  );
};

export default NavBar;
