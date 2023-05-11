import axios from "axios";

const getFavouriteBooks = (id, setBooks, setAlert) => {
  const endpoint = "http://localhost:4000/favourites/search";

  return axios
    .post(endpoint, { userId: id })
    .then((response) => {
      setBooks(response.data);
      if (response.data.length === 0) {
        setAlert({ message: "No favourite book!" });
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

export default getFavouriteBooks;
