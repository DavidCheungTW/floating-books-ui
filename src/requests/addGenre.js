import axios from "axios";

const addGenre = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/genres";

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Genre is added.",
        isSuccess: true,
      });
    })
    .catch((error) => {
      setAlert({
        message: `Server error. Please try again later. (${error.message})`,
        isSuccess: false,
      });
    });
};

export default addGenre;
