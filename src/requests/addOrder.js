import axios from "axios";

const addOrder = (formData, setAlert) => {
  const endpoint = "http://localhost:4000/orders";

  return axios
    .post(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Book is ordered.",
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

export default addOrder;
