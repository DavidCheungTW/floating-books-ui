import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getOrderBooks from "../requests/getOrderBooks";
import Alert from "./Alert";
import "../styles/order-books.css";

const OrderBooks = ({ handleSetSelectBook, loginID, userId }) => {
  const isZero = 0;
  const nullFunction = () => {};
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getOrderBooks(userId, setOrders, setAlert);
  }, []);

  if (!loginID) {
    return (
      <div className="order-books">
        <h2>Order Books</h2>
        Please login first
      </div>
    );
  }

  return (
    <div className="order-books">
      Order Books
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      {!alert.message && orders.length > 0 && (
        <div className="book-card-list">
          {orders.map((order) => (
            <div key={order.id}>
              <BookCard
                book={order.book}
                userId={userId}
                onSaveBook={nullFunction}
                removeId={isZero}
                onRemoveSaveBook={nullFunction}
                onOrderBook={nullFunction}
                orderId={order.id}
                orderStatus={order.status}
                handleSetSelectBook={handleSetSelectBook}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderBooks;
