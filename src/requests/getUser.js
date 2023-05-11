import axios from "axios";

const getUser = (setUsers) => {
  let endpoint = "http://localhost:4000/users";

  return axios
    .get(endpoint)
    .then((response) => {
      setUsers(response.data);
      return 0;
    })
    .catch(() => {
      setUsers([]);
    });
};

export default getUser;
