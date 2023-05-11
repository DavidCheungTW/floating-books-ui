import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noCoverImage from "../images/no-cover-image.jpeg";
import "../styles/book-card.css";

const BookCard = ({
  book,
  userId,
  onSaveBook,
  removeId,
  onRemoveSaveBook,
  onOrderBook,
  orderId,
  orderStatus,
  handleSetSelectBook,
}) => {
  let location = useLocation();
  let { pathname } = location;
  let navigate = useNavigate();
  const fromViewBook = pathname === "/" ? true : false;
  const fromFavourBook = pathname === "/favourite-books" ? true : false;
  const fromOrderBook = pathname === "/order-books" ? true : false;

  const {
    id,
    title,
    ISBN,
    author,
    releaseDate,
    image,
    donatorcomment,
    donateDate,
    genre,
    donator,
    owner,
  } = book;

  return (
    <div className="book-card">
      <div
      // className="book-card-item"
      // onClick={() => {
      //   handleSetSelectBook(book);
      //   navigate("/book-details");
      // }}
      >
        <ul>
          <li>
            {image && (
              <img src={image} alt="coverImage" className="book-image" />
            )}
            {!image && (
              <img
                src={noCoverImage}
                alt="no_cover_image"
                className="book-image"
              />
            )}
          </li>
          {/* <li>Genre:{genre.genre}</li> */}
          <li className="book-title">{title}</li>
          <li>{author}</li>
          {fromOrderBook && <li>{orderStatus}</li>}
        </ul>
      </div>
      {fromViewBook && userId && (
        <button
          type="submit"
          className="button-save"
          onClick={() => {
            onSaveBook(userId, id);
          }}
        >
          Save
        </button>
      )}
      {fromFavourBook && (
        <button
          type="submit"
          className="button-remove"
          onClick={() => {
            onRemoveSaveBook(removeId);
          }}
        >
          Remove
        </button>
      )}
      {fromFavourBook && (
        <button
          type="submit"
          className="button-order"
          onClick={() => {
            onOrderBook(userId, id);
          }}
        >
          Order Now
        </button>
      )}
    </div>
  );
};

export default BookCard;
