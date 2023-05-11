import axios from "axios";

const addBook = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/books";

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Book is added.",
        isSuccess: true,
      });
    })
    .catch(() => {
      setAlert({
        message: "Server error. Please try again later.",
        isSuccess: false,
      });
    });
};

export default addBook;
