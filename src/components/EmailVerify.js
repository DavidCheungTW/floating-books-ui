import React, { useState } from "react";
import updateUser from "../requests/updateUser";
import Alert from "./Alert";
import "../styles/email-verify.css";

const EmailVerify = ({ userList, updateUserList }) => {
  const init = {
    fields: {
      userName: "",
      verifyCode: "",
    },
  };
  const [fields, setFields] = useState(init.fields);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  const handleChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { userName, verifyCode } = fields;

    const userRows = userList.filter((a) => a.userName === userName);

    if (userRows.length === 0) {
      setAlert({
        message: "Please register!",
        isSuccess: false,
      });
      return;
    }

    if (userRows[0].emailVerified) {
      setAlert({
        message: "Email is already verified!",
        isSuccess: false,
      });
      return;
    }

    if (userRows[0].verifyCode !== verifyCode) {
      setAlert({
        message: "Verify code is not match, try again!",
        isSuccess: false,
      });
      return;
    }
    const formData = { emailVerified: true };

    updateUser(userRows[0].id, formData, setAlert);
  };

  return (
    <div className="emailVerify">
      <h2>Email Verification</h2>
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
            className="emailVerify-input-email"
          />
        </label>

        <label htmlFor="verifyCode">
          Verify Code
          <input
            type="text"
            id="verifyCode"
            name="verifyCode"
            value={fields.verifyCode}
            onChange={handleChange}
            className="emailVerify-input-verifyCode"
          />
        </label>
        <button type="submit" className="emailVerify-button-submit">
          Verify Email!
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
