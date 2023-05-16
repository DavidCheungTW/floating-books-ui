import axios from "axios";

const getUserByName = (name, setUsers) => {
  let endpoint = "http://localhost:4000/users/search";
  const formData = {};
  formData.userName = name;

  return axios
    .post(endpoint, formData)
    .then((response) => {
      setUsers(response.data);
      return 0;
    })
    .catch(() => {
      setUsers([]);
    });
};

export default getUserByName;
