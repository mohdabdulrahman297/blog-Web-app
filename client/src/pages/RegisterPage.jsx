import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registration successfull");
    } else {
      alert("registration failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
      <form
        className="bg-white p-8 shadow-md rounded-lg w-96"
        onSubmit={register}
      >
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          Create an Account
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
            type="text"
            placeholder="Choose a username"
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
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          Register
        </button>
      </form>
    </div>
  );
}
