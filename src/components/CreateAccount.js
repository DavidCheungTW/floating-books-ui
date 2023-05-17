import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "@mui/material";
import addUser from "../requests/addUser";
import sendEmail from "../requests/sendEmail";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  deleteUser,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Alert from "./Alert";
import "../styles/create-account.css";

const CreateAccount = ({ onSetUser }) => {
  const [alert, setAlert] = useState({ message: "", isSuccess: true });
  const init = {
    fields: {
      firstName: "",
      lastName: "",
      userName: "",
      postalAddress: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };
  const [fields, setFields] = useState(init.fields);

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      userName,
      postalAddress,
      email,
      password,
      confirmPassword,
    } = fields;

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !postalAddress ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setAlert({
        message: "Please input missing data!",
        isSuccess: false,
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlert({
        message: "Confirm password is not matched, please entry again!",
        isSuccess: false,
      });
      return;
    }

    if (password.length < 8) {
      setAlert({
        message: "Password at least 8 char, please entry again!",
        isSuccess: false,
      });
      return;
    }

    setAlert({
      message: "",
      isSuccess: false,
    });

    // ===== begin: add firebase authentication =====================
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: userName })
          .then((userCredential) => {
            // onSetUser(userCredential.user.email);
            // onSetUser(userName);
            // setAlert({
            //   message: "User is registered, please sign in now",
            //   isSuccess: true,
            // });
            // ===== begin: add records to user table =====================
            const formData = {};
            formData.firstName = firstName;
            formData.lastName = lastName;
            formData.userName = userName;
            formData.postalAddress = postalAddress;
            formData.email = email;
            // addUser(formData, setAlert);
            axios
              .post("http://localhost:4000/users", formData)
              .then(() => {
                setAlert({
                  message: "User is registered, please sign in now",
                  isSuccess: true,
                });
                setFields(init.fields);
              })
              .catch((error) => {
                // let errMsg;
                // if (error.response.data.errors.length > 0) {
                //   errMsg = error.response.data.errors[0].message;
                // } else {
                //   errMsg = "System Error, please try later!";
                // }
                // setAlert({
                //   message: `${errMsg}`,
                //   isSuccess: false,
                // });
                // === begin : remove firebase account
                const auth = getAuth();
                deleteUser(auth.currentUser).catch((error) => {
                  setAlert({
                    message: `Remove account fail - ${error.message}`,
                    isSuccess: false,
                  });
                });
                // === end : remove firebase account
              });
            signOut(auth) // sign out until email verified
              .catch((error) => {
                console.error(error.message);
              });
          })
          // ===== end: add records to user table =====================
          .catch((error) => {
            const auth = getAuth();
            deleteUser(auth.currentUser).catch((error) => {
              setAlert({
                message: `Remove account fail - ${error.message}`,
                isSuccess: false,
              });
            });
          });
      })
      .catch((error) => {
        setAlert({
          message: `${error.message}`,
          isSuccess: false,
        });
      });

    // ===== end : add firebase authentication =====================
  };

  return (
    <div className="create-account">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
          <Input
            type="text"
            id="firstName"
            name="firstName"
            value={fields.firstName}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="lastName">
          Last Name
          <Input
            type="text"
            id="lastName"
            name="lastName"
            value={fields.lastName}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="userName">
          User Name
          <Input
            type="text"
            id="userName"
            name="userName"
            value={fields.userName}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="postalAddress">
          Postal Address
          <Input
            type="text"
            id="postalAddress"
            name="postalAddress"
            value={fields.postalAddress}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="email">
          Email Address
          <Input
            type="email"
            id="email"
            name="email"
            value={fields.email}
            onChange={handleFieldChange}
            placeholder="john.smith@email.co.uk"
            className="input-email"
          />
        </label>

        <label htmlFor="password">
          Password
          <Input
            type="password"
            id="password"
            name="password"
            value={fields.password}
            onChange={handleFieldChange}
            className="input-password"
          />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
            className="input-password"
          />
        </label>

        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-submit"
        >
          Sign up now!
        </Button>
      </form>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
    </div>
  );
};

export default CreateAccount;
