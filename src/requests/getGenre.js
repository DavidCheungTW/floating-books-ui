import axios from "axios";

const getGenre = (setGenres) => {
  let endpoint = "http://localhost:4000/genres";

  return axios
    .get(endpoint)
    .then((response) => {
      setGenres(response.data);
    })
    .catch(() => {
      setGenres([]);
    });
};

export default getGenre;
