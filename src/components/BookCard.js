import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noCoverImage from "../images/no-cover-image.jpeg";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
  onUpdateOrder,
}) => {
  let location = useLocation();
  let { pathname } = location;
  let navigate = useNavigate();
  const fromViewBook = pathname === "/" ? true : false;
  const fromFavourBook = pathname === "/favourite-books" ? true : false;
  const fromOrderBook = pathname === "/order-books" ? true : false;
  const fromFollowupBook = pathname === "/followup-books" ? true : false;

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
          <li>{releaseDate}</li>
          {(fromOrderBook || fromFollowupBook) && <li>{orderStatus}</li>}
        </ul>
      </div>
      {fromViewBook && userId && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-save"
          onClick={() => {
            onSaveBook(userId, id);
          }}
        >
          Save
        </Button>
      )}
      {fromFavourBook && (
        <Button
          startIcon={<DeleteIcon />}
          size="small"
          variant="outlined"
          type="submit"
          className="button-remove"
          onClick={() => {
            onRemoveSaveBook(removeId);
          }}
        >
          Remove
        </Button>
      )}
      {fromFavourBook && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-order"
          onClick={() => {
            onOrderBook(userId, book, removeId);
          }}
        >
          Order Now
        </Button>
      )}

      {fromFollowupBook && orderStatus === "request" && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-reject"
          onClick={() => {
            onUpdateOrder(orderId, "reject");
          }}
        >
          Reject
        </Button>
      )}

      {fromFollowupBook && orderStatus === "request" && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-accept"
          onClick={() => {
            onUpdateOrder(orderId, "accept");
          }}
        >
          Accept
        </Button>
      )}

      {fromFollowupBook && orderStatus === "accept" && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-delivered"
          onClick={() => {
            onUpdateOrder(orderId, "delivered");
          }}
        >
          Delivered
        </Button>
      )}

      {fromOrderBook && orderStatus === "delivered" && (
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-received"
          onClick={() => {
            onUpdateOrder(orderId, "received", id); // id is bookId
          }}
        >
          Received
        </Button>
      )}
    </div>
  );
};

export default BookCard;
