import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Alert from "./Alert";
import "../styles/signin.css";

const Signin = ({ onSetUser, userList, updateUserList }) => {
  const init = {
    fields: {
      userName: "",
      password: "",
    },
  };
  const [fields, setFields] = useState(init.fields);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { userName, password } = fields;

    // ================
    const userRows = userList.filter((a) => a.userName === userName);

    if (userRows.length === 0) {
      setAlert({
        message: "Please Register!",
        isSuccess: false,
      });
      return;
    }

    if (!userRows[0].emailVerified) {
      setAlert({
        message: "Please verify email first!",
        isSuccess: false,
      });
      return;
    }

    // ================

    signInWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        onSetUser(userCredential.user.email);
        setAlert({
          message: "Welcome to Floating Books!",
          isSuccess: true,
        });
        setFields(init.fields);
        // navigate("/");
      })
      .catch((error) => {
        setAlert({
          message: `${error.message}`,
          isSuccess: false,
        });
      });
  };

  return (
    <div className="signin">
      <h2>Sign in</h2>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">
          User Name
          <input
            type="email"
            id="userName"
            name="userName"
            value={fields.userName}
            onChange={handleChange}
            placeholder="john.smith@email.co.uk"
            className="signin-input-email"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            className="signin-input-password"
          />
        </label>
        <button type="submit" className="signin-button-submit">
          Sign in!
        </button>
      </form>
      <Link className="create-account-button" to="create-account">
        Sign up now !
      </Link>
      <Link className="email-verify-button" to="email-verify">
        Email Verify !
      </Link>
    </div>
  );
};

export default Signin;
