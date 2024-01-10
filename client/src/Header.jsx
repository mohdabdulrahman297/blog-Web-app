import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <Link
        to="/"
        className="text-2xl font-bold text-black hover:text-gray-500"
      >
        MyBlog
      </Link>
      <nav className="flex items-center space-x-4">
        {username && (
          <>
            <Link
              to="/create"
              className="create-post-link hover:bg-gray-300 text-black px-4 py-2 rounded-md"
            >
              Create new post
            </Link>
            <a
              onClick={logout}
              className="logout-link hover:bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer"
            >
              Logout ({username})
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
