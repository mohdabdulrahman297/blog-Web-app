import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  useEffect(() => {
    fetch("http://localhost:4000/profile", (req, res) => {
      credentials: "include";
    });
  }, []);
  return (
    <header className="flex items-center justify-between p-4">
      <Link
        to="/"
        className="text-2xl font-bold text-black hover:text-gray-500"
      >
        MyBlog
      </Link>
      <nav>
        <Link to="/login" className="mr-4 hover:text-gray-500">
          Login
        </Link>
        <Link to="/register" className="hover:text-gray-500">
          Register
        </Link>
      </nav>
    </header>
  );
}
