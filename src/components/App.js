import React, { useState, useEffect, useInsertionEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import ViewBooks from "./ViewBooks";
import BookDetails from "./BookDetails";
import RegisterBook from "./RegisterBook";
import FavouriteBooks from "./FavouriteBooks";
import OrderBooks from "./OrderBooks";
import FollowupBooks from "./FollowupBooks";
import Signin from "./Signin";
import CreateAccount from "./CreateAccount";
import {
  signOut,
  getAuth,
  deleteUser,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Alert from "./Alert";
import getUserByName from "../requests/getUserByName";
import "../styles/app.css";

const App = () => {
  const [displayName, setDisplayName] = useState(); //user.userName
  const [userList, setUserList] = useState([]);
  const [userId, setUserId] = useState(); //user.id
  const [selectBook, setSelectBook] = useState(""); // one book is clicked
  const [alert, setAlert] = useState({ message: "", isSuccess: true });

  // ===== begin add firebase
  const [user, setUser] = useState(null);

  useInsertionEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  //===== end add firebase

  useEffect(() => {
    getUserByName(displayName, setUserList);
    if (displayName && userList.length > 0) {
      const userRows = userList.filter((a) => a.userName === displayName);
      if (userRows.length > 0) {
        setUserId(userRows[0].id);
      }
    }
  }, [displayName, userList]);

  const updateUserList = (ul) => {
    setUserList(ul);
  };

  const handleSetSelectBook = (book) => {
    setSelectBook(book);
  };

  const handleLogin = (id) => {
    setDisplayName(id);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("firebaseToken");
        setDisplayName();
        setUserId();
      })
      .catch((error) => {
        setAlert({
          message: `Sign out fail - ${error.message}`,
          isSuccess: false,
        });
      });
  };

  // const handleRemove = () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;

  //   deleteUser(user)
  //     .then(() => {
  //       setAlert({
  //         message: "account is removed!",
  //         isSuccess: true,
  //       });
  //       setDisplayName();
  //       setUserId();
  //     })
  //     .catch((error) => {
  //       setAlert({
  //         message: `Remove account fail - ${error.message}`,
  //         isSuccess: false,
  //       });
  //     });
  // };

  return (
    <div className="App">
      {/* <h1>Floating Books UI</h1> */}
      <div className="show-user-id">
        User ID: {displayName} ({userId})
      </div>
      <NavBar
        displayName={displayName}
        onLogin={handleLogin}
        onLogout={handleLogout}
        // onRemove={handleRemove}
      />
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
          element={<RegisterBook displayName={displayName} userId={userId} />}
        />
        <Route
          path="favourite-books"
          element={
            <FavouriteBooks
              handleSetSelectBook={handleSetSelectBook}
              displayName={displayName}
              userId={userId}
            />
          }
        />
        <Route
          path="order-books"
          element={
            <OrderBooks
              handleSetSelectBook={handleSetSelectBook}
              displayName={displayName}
              userId={userId}
            />
          }
        />
        <Route
          path="followup-books"
          element={
            <FollowupBooks
              handleSetSelectBook={handleSetSelectBook}
              displayName={displayName}
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
      </Routes>
      {alert.message && (
        <Alert message={alert.message} isSuccess={alert.isSuccess} />
      )}
    </div>
  );
};

export default App;
