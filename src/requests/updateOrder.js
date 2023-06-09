import axios from "axios";

const updateOrder = (id, newStatus, setAlert) => {
  const endpoint = `http://localhost:4000/orders/${id}`;

  const formData = {};
  formData.status = newStatus;

  return axios
    .patch(endpoint, formData)
    .then(() => {
      setAlert({
        message: "Order status is updated.",
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

export default updateOrder;
