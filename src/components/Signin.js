import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Alert from "./Alert";
import { Input, Button } from "@mui/material";
import "../styles/signin.css";

const Signin = ({ onSetUser, userList, updateUserList }) => {
  let navigate = useNavigate();
  const init = {
    fields: {
      email: "",
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

    const { email, password } = fields;

    if (!email || !password) {
      setAlert({
        message: "Please input missing fields!",
        isSuccess: false,
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        if (!user.emailVerified) {
          setAlert({
            message: "Please do email verification!",
            isSuccess: false,
          });
          sendEmailVerification(auth.currentUser).catch((error) => {
            console.error(error.message);
          });
          return;
        }

        localStorage.setItem("firebaseToken", user.accessToken);
        onSetUser(user.displayName);
        setAlert({
          message: "Welcome to Floating Books!",
          isSuccess: true,
        });
        setFields(init.fields);
        navigate("/");
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email address
          <Input
            type="email"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            placeholder="john.smith@email.co.uk"
            className="signin-input-email"
          />
        </label>

        <label htmlFor="password">
          Password
          <Input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            className="signin-input-password"
          />
        </label>
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="signin-button-submit"
        >
          Sign in!
        </Button>
      </form>
      <Button
        component={Link}
        size="small"
        variant="outlined"
        className="create-account-button"
        to="create-account"
      >
        Sign up now !
      </Button>
      <Button
        component={Link}
        size="small"
        variant="outlined"
        className="email-verify-button"
        to="email-verify"
      >
        Email Verify !
      </Button>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
    </div>
  );
};

export default Signin;
