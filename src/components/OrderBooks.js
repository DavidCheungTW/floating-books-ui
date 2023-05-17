import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getOrderBooks from "../requests/getOrderBooks";
import updateOrder from "../requests/updateOrder";
import updateBook from "../requests/updateBook";
import sendEmail from "../requests/sendEmail";
import Alert from "./Alert";
import "../styles/order-books.css";

const OrderBooks = ({ handleSetSelectBook, displayName, userId }) => {
  const isZero = 0;
  const nullFunction = () => {};
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getOrderBooks(setOrders, setAlert);
  }, []);

  if (!displayName) {
    return (
      <div className="order-books">
        <h2>Order Books</h2>
        Please login first
      </div>
    );
  }

  const handleUpdateOrders = (order, newStatus, bookId = 0) => {
    updateOrder(order.id, newStatus, setAlert);

    // send email current owner , book is received @@@
    const emailData = {};
    emailData.from = "";
    emailData.to = order.book.owner.email;
    emailData.subject = `${order.book.title} is received. Thank you!`;
    const message = `<p style='font-weight:bold;'> Dear ${order.book.owner.userName}, </p> Your book is received by ${order.user.userName}. Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin </p>`;
    emailData.html = message;

    sendEmail(emailData, setAlert);

    if (newStatus === "received") {
      // update book.ownerId >> userId
      updateBook(bookId, userId, setAlert);
    }
  };

  const myOrderBooks = orders.filter((order) => order.userId === userId);

  return (
    <div className="order-books">
      Order Books
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      {!alert.message && orders.length > 0 && (
        <div className="book-card-list">
          {myOrderBooks.map((order) => (
            <div key={order.id}>
              <BookCard
                book={order.book}
                userId={userId}
                onSaveBook={nullFunction}
                removeId={isZero}
                onRemoveSaveBook={nullFunction}
                onOrderBook={nullFunction}
                order={order}
                handleSetSelectBook={handleSetSelectBook}
                onUpdateOrder={handleUpdateOrders}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderBooks;
