import axios from "axios";

const addUser = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/users";

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Account is created.",
        isSuccess: true,
      });
      return 0;
    })
    .catch(() => {
      setAlert({
        message: "Server error. Please try again later.",
        isSuccess: false,
      });
    });
};

export default addUser;
