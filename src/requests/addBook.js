import axios from "axios";

const addBook = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/books";

  axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem(
    "firebaseToken"
  )}`;

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Book is added.",
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

export default addBook;
