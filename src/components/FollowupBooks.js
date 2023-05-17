import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getOrderBooks from "../requests/getOrderBooks";
import updateOrder from "../requests/updateOrder";
import sendEmail from "../requests/sendEmail";
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

  const handleUpdateOrders = (order, newStatus, bookId = 0) => {
    updateOrder(order.id, newStatus, setAlert);

    if (newStatus === "accept") {
      // send email to requestor, your request is accept @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} request is accepted!`;
      emailData.text = `Dear ${order.user.userName}, Your book request is accepted. Thank you very much. Sincerely, Floating Books Admin `;
      sendEmail(emailData, setAlert);
    }

    if (newStatus === "reject") {
      // send email to requestor, your request is rejected @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} request is rejected!`;
      emailData.text = `Dear ${order.user.userName}, Your book request is rejected. Thank you very much. Sincerely, Floating Books Admin `;
      sendEmail(emailData, setAlert);
    }

    if (newStatus === "delivered") {
      // send email to requestor, book is delivered @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} is already delivered!`;
      emailData.text = `Dear ${order.user.userName}, Your requested book is already delivered. Thank you very much. Sincerely, Floating Books Admin `;
      sendEmail(emailData, setAlert);
    }
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
                order={order}
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
