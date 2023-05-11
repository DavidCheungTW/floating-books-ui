import axios from "axios";

const getOrderBooks = (id, setBooks, setAlert) => {
  const endpoint = "http://localhost:4000/orders/search";

  return axios
    .post(endpoint, { userId: id })
    .then((response) => {
      setBooks(response.data);
      if (response.data.length === 0) {
        setAlert({ message: "No Order book!" });
      } else {
        setAlert({ message: "" });
      }
    })
    .catch(() => {
      setBooks([]);
      setAlert({
        message: "Get error, please try again later!",
      });
    });
};

export default getOrderBooks;
