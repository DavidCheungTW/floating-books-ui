import axios from "axios";

const sendEmail = (emailData, setAlert) => {
  const endpoint = "http://localhost:4000/api/email";

  return axios.post(endpoint, emailData).catch(() => {
    setAlert({
      message: "Server error. Please try again later.",
      isSuccess: false,
    });
  });
};

export default sendEmail;

// axios
//   .post("http://localhost:4000/api/email", emailData)
//   .then(() => {
//     setAlert({
//       message: "Invitation Email is sent!",
//       isSuccess: true,
//     });
//     // setFields(init.fields);
//   })
//   .catch((error) => {
//     let errMsg;
//     if (error.response.data.errors.length > 0) {
//       errMsg = error.response.data.errors[0].message;
//     } else {
//       errMsg = "Email sent failed, please try later!";
//     }
//     setAlert({
//       message: `${errMsg}`,
//       isSuccess: false,
//     });
//   });
