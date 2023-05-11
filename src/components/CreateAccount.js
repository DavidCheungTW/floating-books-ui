import React, { useState } from "react";
import addUser from "../requests/addUser";
import sendEmail from "../requests/sendEmail";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
      password,
      confirmPassword,
    } = fields;

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !postalAddress ||
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

    const formData = {};
    formData.firstName = firstName;
    formData.lastName = lastName;
    formData.userName = userName;
    formData.postalAddress = postalAddress;
    formData.verifyCode = Math.random().toString(36).substring(2, 6);
    // formData.emailVerified = true;

    addUser(formData, setAlert);

    // axios
    //   .post("http://localhost:4000/users", formData)
    //   .then(() => {
    //     setAlert({
    //       message: "User is registered, please sign in now",
    //       isSuccess: true,
    //     });
    //     // setFields(init.fields);
    //   })
    //   .catch((error) => {
    //     let errMsg;
    //     if (error.response.data.errors.length > 0) {
    //       errMsg = error.response.data.errors[0].message;
    //     } else {
    //       errMsg = "System Error, please try later!";
    //     }
    //     setAlert({
    //       message: `${errMsg}`,
    //       isSuccess: false,
    //     });
    //   });

    createUserWithEmailAndPassword(auth, userName, password)
      .then((userCredential) => {
        // onSetUser(userCredential.user.email);
        setAlert({
          message: "User is registered, please sign in now",
          isSuccess: true,
        });
      })
      .catch((error) => {
        setAlert({
          message: `${error.message}`,
          isSuccess: false,
        });
      });

    const emailData = {};
    emailData.from = "";
    emailData.to = userName;
    emailData.subject = "Thank you, you are registed in Floating Books!";
    emailData.text = `Dear ${firstName},${lastName}, Thank you for your registation! Please activiate your account with verifiy code ${formData.verifyCode}. Sincerely, Floating Books Admin `;

    sendEmail(emailData, setAlert);
  };

  return (
    <div className="create-account">
      <h2>Create Account</h2>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          First Name
          <input
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
          <input
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
          <input
            type="email"
            id="userName"
            name="userName"
            value={fields.userName}
            onChange={handleFieldChange}
            placeholder="john.smith@email.co.uk"
            className="input-email"
          />
        </label>

        <label htmlFor="postalAddress">
          Postal Address
          <input
            type="text"
            id="postalAddress"
            name="postalAddress"
            value={fields.postalAddress}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
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
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
            className="input-password"
          />
        </label>

        <button type="submit" className="button-submit">
          Sign up now!
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
