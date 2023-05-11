import axios from "axios";

const addFavourite = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/favourites";

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Favourite book added.",
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

export default addFavourite;
