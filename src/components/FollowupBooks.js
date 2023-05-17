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
      let message = `<p style='font-weight:bold;'> Dear ${order.user.userName},</p> Your book request is accepted. Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
      emailData.html = message;

      sendEmail(emailData, setAlert);

      // send email to owner about the address or requestor @@@
      emailData.to = order.book.owner.email;
      emailData.subject = `${order.book.title} deliver information details!`;
      message = `<p style='font-weight:bold;'> Dear ${order.book.owner.userName},</p> Please deliver your book to: <p>TO: ${order.user.firstName},${order.user.lastName} </p> <p>ADDRESS: ${order.user.postalAddress} </p> Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
      emailData.html = message;

      sendEmail(emailData, setAlert);
    }

    if (newStatus === "reject") {
      // send email to requestor, your request is rejected @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} request is rejected!`;
      const message = `<p style='font-weight:bold;'>Dear ${order.user.userName},</p> Your book request is rejected. Thank you very much. <p style='font-weight:bold;'>Sincerely, Floating Books Admin </p>`;
      emailData.html = message;

      sendEmail(emailData, setAlert);
    }

    if (newStatus === "delivered") {
      // send email to requestor, book is delivered @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} is already delivered!`;
      const message = `<p style='font-weight:bold;'>Dear ${order.user.userName}, </p>Your requested book is already delivered. Thank you very much.<p style='font-weight:bold;'> Sincerely, Floating Books Admin </p>`;
      emailData.html = message;

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
