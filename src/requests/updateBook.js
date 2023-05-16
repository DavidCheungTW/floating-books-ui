import axios from "axios";

const updateBook = (bookId, userId, setAlert) => {
  const endpoint = `http://localhost:4000/books/${bookId}`;

  const formData = {};
  formData.ownerId = userId;

  return axios
    .patch(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Book owner is updated.",
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

export default updateBook;
