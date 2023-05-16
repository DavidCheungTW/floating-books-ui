import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getOrderBooks from "../requests/getOrderBooks";
import updateOrder from "../requests/updateOrder";
import Alert from "./Alert";
import "../styles/order-books.css";

const FollowupBooks = ({ handleSetSelectBook, displayName, userId }) => {
  const isZero = 0;
  const nullFunction = () => {};
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getOrderBooks(setOrders, setAlert);
  }, []);

  if (!displayName) {
    return (
      <div className="followup-books">
        <h2>Follow up Books</h2>
        Please login first
      </div>
    );
  }

  const handleUpdateOrders = (id, newStatus, bookId = 0) => {
    updateOrder(id, newStatus, setAlert);
  };

  const followupBooks = orders.filter(
    (order) =>
      order.book.ownerId === userId &&
      order.status !== "received" &&
      order.status !== "reject"
  );

  return (
    <div className="followup-books">
      Follow up Books
      {!alert.message && orders.length > 0 && (
        <div className="book-card-list">
          {followupBooks.map((order) => (
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
                onUpdateOrder={handleUpdateOrders}
              />
            </div>
          ))}
        </div>
      )}
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
    </div>
  );
};

export default FollowupBooks;
