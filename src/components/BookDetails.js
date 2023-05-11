import React from "react";
import noCoverImage from "../images/no-cover-image.jpeg";
import "../styles/book-details.css";

const BookDetails = ({ book }) => {
  const {
    genre,
    title,
    ISBN,
    author,
    releaseDate,
    donator,
    donateDate,
    donatorcomment,
    owner,
    image,
  } = book;

  return (
    <div className="book-details">
      <h2>Book Details</h2>
      <ul>
        <li>Genre:{genre.genre}</li>
        <li>Title:{title}</li>
        <li>Author:{author}</li>
        <li>Release Date:{releaseDate}</li>
        <li>ISBN:{ISBN}</li>
        <li>Donator:{donator.firstName}</li>
        <li>Donate Date:{donateDate}</li>
        <li>Donator Comment:{donatorcomment}</li>
        <li>Current Owner:{owner.firstName}</li>
        <li>
          {image && (
            <img src={image} alt="cover image" className="book-image" />
          )}
          {!image && (
            <img
              src={noCoverImage}
              alt="no_cover_image"
              className="book-image"
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default BookDetails;
