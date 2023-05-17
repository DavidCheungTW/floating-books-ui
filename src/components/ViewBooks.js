import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BookCard from "./BookCard";
import getBook from "../requests/getBook";
import getFavouriteBooks from "../requests/getFavouriteBooks";
import addFavourite from "../requests/addFavourite";
import Alert from "./Alert";
import SideBar from "./SideBar";
import "../styles/view-books.css";

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

const ViewBooks = ({ handleSetSelectBook, userId }) => {
  const { search } = useLocation();
  const isZero = 0;
  const nullFunction = () => {};
  const [books, setBooks] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });

  useEffect(() => {
    const query = search;
    getBook(setBooks, setAlert, query);
  }, [search]);

  useEffect(() => {
    if (userId) {
      getFavouriteBooks(userId, setFavourites, () => {});
    }
  }, [userId]);

  const addFavouriteBook = (userId, bookId) => {
    const exist = favourites.find((fav) => fav.bookId === bookId);
    if (exist) {
      setAlert({
        message: "Book is already saved.",
        isSuccess: false,
      });
      return;
    }

    const formData = {};
    formData.createDate = formatDate(new Date());
    formData.userId = userId;
    formData.bookId = bookId;
    addFavourite(formData, setAlert);
  };

  return (
    <div className="view-books">
      <div className="column left">
        <SideBar />
      </div>
      <div className="column right">
        {/* View Books */}
        {!alert.message && books.length > 0 && (
          <div className="book-card-list">
            {books.map((book) => (
              <div key={book.id}>
                <BookCard
                  book={book}
                  userId={userId}
                  onSaveBook={addFavouriteBook}
                  removeId={isZero}
                  onRemoveSaveBook={nullFunction}
                  onOrderBook={nullFunction}
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
    </div>
  );
};

export default ViewBooks;
