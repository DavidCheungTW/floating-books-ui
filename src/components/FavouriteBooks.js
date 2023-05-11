import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import getFavouriteBooks from "../requests/getFavouriteBooks";
import removeFavourite from "../requests/removeFavourite";
import addOrder from "../requests/addOrder";
import getOrderBooks from "../requests/getOrderBooks";
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

const FavouriteBooks = ({ handleSetSelectBook, loginID, userId }) => {
  const isZero = 0;
  const nullFunction = () => {};
  const [favourites, setFavourites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getFavouriteBooks(userId, setFavourites, setAlert);
  }, [userId]);

  useEffect(() => {
    getOrderBooks(userId, setOrders, () => {});
  }, [userId]);

  const removeFavouriteBook = (id) => {
    removeFavourite(id, setAlert);
  };

  const orderBook = (userId, bookId) => {
    const exist = orders.find((order) => order.bookId === bookId);
    if (exist) {
      setAlert({
        message: "Book is already ordered.",
        isSuccess: false,
      });
      return;
    }

    let formData = {};
    formData.orderDate = formatDate(new Date());
    formData.userId = userId;
    formData.bookId = bookId;
    addOrder(formData, setAlert);
  };

  if (!loginID) {
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
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
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
                onOrderBook={orderBook}
                orderId={isZero}
                orderStatus={""}
                handleSetSelectBook={handleSetSelectBook}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteBooks;
