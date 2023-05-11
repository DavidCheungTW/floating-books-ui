import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ViewBooks from "./ViewBooks";
import BookDetails from "./BookDetails";
import RegisterBook from "./RegisterBook";
import FavouriteBooks from "./FavouriteBooks";
import OrderBooks from "./OrderBooks";
import Signin from "./Signin";
import CreateAccount from "./CreateAccount";
import EmailVerify from "./EmailVerify";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import Alert from "./Alert";
import getUser from "../requests/getUser";
import "../styles/app.css";

const App = () => {
  const [loginID, setLoginID] = useState();
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState();
  const [selectBook, setSelectBook] = useState("");
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  useEffect(() => {
    getUser(setUserList);
    if (loginID && userList.length > 0) {
      const userRows = userList.filter((a) => a.userName === loginID);
      if (userRows.length > 0) {
        setUserId(userRows[0].id);
      }
    }
  }, [loginID, userList]);

  const updateUserList = (ul) => {
    setUserList(ul);
  };

  const handleSetSelectBook = (book) => {
    setSelectBook(book);
  };

  const handleLogin = (id) => {
    setLoginID(id);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoginID();
        setUserId();
      })
      .catch((error) => {
        setAlert({
          message: `Sign out fail - ${error.message}`,
          isSuccess: false,
        });
      });
  };

  return (
    <div className="App">
      <h1>Floating Books UI</h1>
      <div className="show-user-id">
        User ID: {loginID} ({userId})
      </div>
      <NavBar loginID={loginID} onLogin={handleLogin} onLogout={handleLogout} />
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ViewBooks
              handleSetSelectBook={handleSetSelectBook}
              userId={userId}
            />
          }
        />
        <Route
          path="book-details"
          element={<BookDetails book={selectBook} />}
        />
        <Route
          path="register-book"
          element={<RegisterBook loginID={loginID} userId={userId} />}
        />
        <Route
          path="favourite-books"
          element={
            <FavouriteBooks
              handleSetSelectBook={handleSetSelectBook}
              loginID={loginID}
              userId={userId}
            />
          }
        />
        <Route
          path="order-books"
          element={
            <OrderBooks
              handleSetSelectBook={handleSetSelectBook}
              loginID={loginID}
              userId={userId}
            />
          }
        />
        <Route
          path="signin"
          element={
            <Signin
              onSetUser={handleLogin}
              userList={userList}
              updateUserList={updateUserList}
            />
          }
        />
        <Route
          path="signin/create-account"
          element={<CreateAccount onSetUser={handleLogin} />}
        />
        <Route
          path="signin/email-verify"
          element={
            <EmailVerify userList={userList} updateUserList={updateUserList} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
