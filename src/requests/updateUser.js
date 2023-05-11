import axios from "axios";

const updateUser = (id, formData, setAlert) => {
  const endpoint = `http://localhost:4000/users/${id}`;

  return axios
    .patch(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Email is verified.",
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

export default updateUser;
