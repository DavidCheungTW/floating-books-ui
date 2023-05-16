import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
// import { SlMagnifier } from "react-icons/sl";
import { Input, Button } from "@mui/material";
import "../styles/side-bar.css";

const SideBar = () => {
  const { search } = useLocation();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const buildQueryString = (operation, valueObj) => {
    const currentQuery = qs.parse(search, {
      ignoreQueryPrefix: true,
    });
    // const newQuery = {
    //   ...currentQuery,
    //   [operation]: JSON.stringify({
    //     ...JSON.parse(currentQuery[operation] || "{}"),
    //     ...valueObj,
    //   }),
    // };
    const newQuery =
      operation === "sort"
        ? { ...currentQuery, [operation]: JSON.stringify({ ...valueObj }) }
        : { [operation]: JSON.stringify({ ...valueObj }) };

    const newSearch = qs.stringify(newQuery, {
      addQueryPrefix: true,
      encode: false,
    });
    return newSearch;
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const searchQuery = buildQueryString("query", {
      title: searchText,
    });
    navigate(searchQuery);
  };

  return (
    <div className="side-bar">
      <form className="search-form" onSubmit={handleSearch}>
        <Input
          type="text"
          id="searchText"
          name="searchText"
          placeholder="Search by title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button size="small" variant="outlined" type="submit">
          {/* <SlMagnifier /> */}
          Search
        </Button>
      </form>
      {/* <ul className="side-bar-links">
        <h5>Filter by City:</h5>

        <div className="cityGroup">
          {cities.map((city) => (
            <li key={city} className="side-bar-links-item">
              <Link className="item" to={buildQueryString("query", { city })}>
                {city}
              </Link>
            </li>
          ))}
        </div>
        <h5>Sort by:</h5> */}
      <ul className="sortGroup">
        <Link className="item" to={buildQueryString("sort", { title: 1 })}>
          Title Ascending
        </Link>
        <Link className="item" to={buildQueryString("sort", { title: -1 })}>
          Title Descending
        </Link>
        <Link className="item" to={buildQueryString("sort", { author: 1 })}>
          Author Ascending
        </Link>
        <Link className="item" to={buildQueryString("sort", { author: -1 })}>
          Author Descending
        </Link>
        <Link
          className="item"
          to={buildQueryString("sort", { releaseDate: 1 })}
        >
          Release Date Ascending
        </Link>
        <Link
          className="item"
          to={buildQueryString("sort", { releaseDate: -1 })}
        >
          Release Date Descending
        </Link>
      </ul>
      {/* </ul> */}
    </div>
  );
};

export default SideBar;
