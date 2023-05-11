import axios from "axios";

const removeFavourite = (id, setAlert) => {
  const endpoint = `http://localhost:4000/favourites/${id}`;

  return axios
    .delete(endpoint)
    .then(() => {
      setAlert({
        message: "Favourite book removed.",
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

export default removeFavourite;
