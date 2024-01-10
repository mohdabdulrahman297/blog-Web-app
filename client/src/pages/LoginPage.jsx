import React, { useContext, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
      <form className="bg-white p-8 shadow-md rounded-lg w-96" onSubmit={login}>
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Welcome Back!
        </h1>
        <div className="mb-4 relative">
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex items-center"
            htmlFor="username"
          >
            <FaUser className="text-lg text-gray-500 mr-2" />
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div className="mb-6 relative">
          <label
            className="text-gray-700 text-sm font-bold mb-2 flex items-center"
            htmlFor="password"
          >
            <FaLock className="text-lg text-gray-500 mr-2" />
            Password
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-500"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Login
        </button>
      </form>
    </div>
  );
}
