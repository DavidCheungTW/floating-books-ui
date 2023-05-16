import React, { useState, useEffect } from "react";
import getGenre from "../requests/getGenre";
import addBook from "../requests/addBook";
import Alert from "./Alert";
import { Input, Button } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import "../styles/register-book.css";

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

const RegisterBook = ({ displayName, userId }) => {
  const [genreList, setGenreList] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  const initialState = {
    fields: {
      selectGenre: "",
      title: "",
      author: "",
      releaseDate: "",
      ISBN: "",
      comment: "",
      image: undefined,
    },
  };
  const [fields, setFields] = useState(initialState.fields);

  useEffect(() => {
    getGenre(setGenreList);
  }, []);

  const handleFieldChange = (event) => {
    if (event.target.name === "image") {
      setFields({
        ...fields,
        [event.target.name]: event.target.files[0],
      });
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  };

  const handleRegisterBook = async (event) => {
    event.preventDefault();

    if (!displayName) {
      setAlert({
        message: "Please login before register book!",
        isSuccess: false,
      });
      return;
    }

    const { title, ISBN, author, releaseDate, image, comment, selectGenre } =
      fields;

    setAlert({
      message: "",
      isSuccess: false,
    });

    if (title && author && releaseDate) {
      const newGenreId = genreList.filter((a) => a.genre === selectGenre)[0].id;

      const formData = new FormData();
      formData.append("title", title);
      formData.append("ISBN", ISBN);
      formData.append("author", author);
      formData.append("releaseDate", releaseDate);
      formData.append("donatorcomment", comment);
      formData.append("donateDate", formatDate(new Date()));
      formData.append("genreId", newGenreId);
      formData.append("donatorId", userId);
      formData.append("ownerId", userId);
      if (image) {
        formData.append("image", image);
      } else {
        formData.append("image", "");
      }
      addBook(formData, setAlert);
      return;
    }
    setAlert({
      message: "Please enter missing information!",
      isSuccess: false,
    });
  };

  return (
    <div className="register-book">
      Register Book
      <form className="register-book-form" onSubmit={handleRegisterBook}>
        <label htmlFor="selectGenre">
          Genre:
          <select
            id="selectGenre"
            name="selectGenre"
            value={fields.selectGenre}
            onChange={handleFieldChange}
            className="input-select"
          >
            {genreList.map((genre) => (
              <option key={genre.genre} value={genre.genre}>
                {genre.genre}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="title">
          Title:
          <Input
            type="text"
            id="title"
            name="title"
            value={fields.title}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>
        <label htmlFor="author">
          Author:
          <Input
            type="text"
            id="author"
            name="author"
            value={fields.author}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>
        <label htmlFor="releaseDate">
          Release Date:
          <Input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={fields.releaseDate}
            onChange={handleFieldChange}
            className="input-date"
          />
        </label>
        <label htmlFor="ISBN">
          ISBN:
          <Input
            type="text"
            id="ISBN"
            name="ISBN"
            value={fields.ISBN}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>
        <label htmlFor="comment">
          Comment:
          <Input
            type="text"
            id="comment"
            name="comment"
            value={fields.comment}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>

        <label htmlFor="image">
          {/* Image: */}
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleFieldChange}
            className="input-file"
          />
        </label>
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-register"
        >
          Register
        </Button>
      </form>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
    </div>
  );
};

export default RegisterBook;
