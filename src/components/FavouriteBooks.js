import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getFavouriteBooks from "../requests/getFavouriteBooks";
import removeFavourite from "../requests/removeFavourite";
import addOrder from "../requests/addOrder";
import getOrderBooks from "../requests/getOrderBooks";
import sendEmail from "../requests/sendEmail";
import Alert from "./Alert";
import "../styles/favourite-books.css";

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

const FavouriteBooks = ({ handleSetSelectBook, displayName, userId }) => {
  const isZero = 0;
  const nullFunction = () => {};
  const [favourites, setFavourites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getFavouriteBooks(userId, setFavourites, setAlert);
  }, [userId]);

  useEffect(() => {
    getOrderBooks(setOrders, () => {});
  }, [userId]);

  const removeFavouriteBook = (id) => {
    removeFavourite(id, setAlert);
  };

  const handleOrderBook = (userId, book, favouriteId) => {
    const exist = orders.find(
      (order) =>
        order.bookId === book.id &&
        order.status !== "received" &&
        order.status !== "reject"
    );
    if (exist) {
      setAlert({
        message: "Book is already ordered.",
        isSuccess: false,
      });
      return;
    }

    if (book.ownerId === userId) {
      setAlert({
        message: "Book is in your place, no need order!",
        isSuccess: false,
      });
      return;
    }

    let formData = {};
    formData.orderDate = formatDate(new Date());
    formData.userId = userId;
    formData.bookId = book.id;
    addOrder(formData, setAlert);

    removeFavourite(favouriteId, () => {});

    // send email to owner, someone order your book, please follow up @@@
    const emailData = {};
    emailData.from = "";
    emailData.to = book.owner.email;
    emailData.subject = `${book.title} is requested, please follow up!`;
    const message = `<p style='font-weight:bold;'>  Dear ${book.owner.userName}, </p> ${displayName} is requesting your book. Please follow up. Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
    emailData.html = message;
    sendEmail(emailData, setAlert);
  };

  if (!displayName) {
    return (
      <div className="favourite-books">
        <h2>Favourite Books</h2>
        Please login first
      </div>
    );
  }

  return (
    <div className="favourite-books">
      Favourite Books
      {!alert.message && favourites.length > 0 && (
        <div className="book-card-list">
          {favourites.map((fav) => (
            <div key={fav.id}>
              <BookCard
                book={fav.book}
                userId={userId}
                onSaveBook={nullFunction}
                removeId={fav.id}
                onRemoveSaveBook={removeFavouriteBook}
                onOrderBook={handleOrderBook}
                order={{}}
                handleSetSelectBook={handleSetSelectBook}
                onUpdateOrder={nullFunction}
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

export default FavouriteBooks;
