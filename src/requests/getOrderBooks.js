import axios from "axios";

const getOrderBooks = (setBooks, setAlert) => {
  const endpoint = "http://localhost:4000/orders/search";

  return axios
    .post(endpoint)
    .then((response) => {
      setBooks(response.data);
      if (response.data.length === 0) {
        setAlert({ message: "No Order book!", isSuccess: true });
      } else {
        setAlert({ message: "", isSuccess: true });
      }
    })
    .catch(() => {
      setBooks([]);
      setAlert({
        message: "Get error, please try again later!",
        isSuccess: false,
      });
    });
};

export default getOrderBooks;
