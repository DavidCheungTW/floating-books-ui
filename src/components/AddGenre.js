import React, { useState, useEffect } from "react";
import getGenre from "../requests/getGenre";
import addGenre from "../requests/addGenre";
import Alert from "./Alert";
import { Input, Button } from "@mui/material";
import "../styles/add-genre.css";

const AddGenre = () => {
  const [genreList, setGenreList] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  const initialState = {
    fields: {
      genre: "",
    },
  };
  const [fields, setFields] = useState(initialState.fields);

  useEffect(() => {
    getGenre(setGenreList);
  }, [alert]);

  const handleFieldChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleAddGenre = async (event) => {
    event.preventDefault();

    const { genre } = fields;

    setAlert({
      message: "",
      isSuccess: false,
    });

    if (genre) {
      const formData = {};
      formData.genre = genre;

      addGenre(formData, setAlert);
      setFields(initialState.fields);
      return;
    } else {
      setAlert({
        message: "Please enter missing information!",
        isSuccess: false,
      });
    }
  };

  return (
    <div className="add-genre">
      Add Genre
      <form className="add-genre-form" onSubmit={handleAddGenre}>
        <label htmlFor="genre">
          Genre:
          <Input
            type="text"
            id="genre"
            name="genre"
            value={fields.genre}
            onChange={handleFieldChange}
            className="input-text"
          />
        </label>
        <Button
          size="small"
          variant="outlined"
          type="submit"
          className="button-add-genre"
        >
          Add
        </Button>
      </form>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      <div className="genre-list">
        {genreList
          .sort((a, b) =>
            a.genre.toLowerCase() > b.genre.toLowerCase() ? 1 : -1
          )
          .map((item) => (
            <div key={item.id} className="genre-item">
              {item.genre}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddGenre;
