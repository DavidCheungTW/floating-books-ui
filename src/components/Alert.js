import React from "react";
import PropTypes from "prop-types";
import "../styles/alert.css";

const Alert = ({ message, isSuccess }) => {
  if (!message) return null;
  return (
    <div
      className={`${isSuccess ? "alert alert-success" : "alert alert-fail"}`}
    >
      {message}
    </div>
  );
};

export default Alert;

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
