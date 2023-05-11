import axios from "axios";

const getBook = (setBooks, setAlert, query) => {
  let endpoint = "http://localhost:4000/books";

  if (query) {
    endpoint += query;
  }

  return axios
    .get(endpoint)
    .then((response) => {
      setBooks(response.data);
      if (response.data.length === 0) {
        setAlert({ message: "No book in application, please try again!" });
      } else {
        setAlert({ message: "" });
      }
    })
    .catch(() => {
      setBooks([]);
      setAlert({ message: "Book Listings error, please try again!" });
    });
};

export default getBook;
