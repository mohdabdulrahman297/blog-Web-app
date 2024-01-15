import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  // State variables to store form input values
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  // React Router hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Creating a FormData object to send form data as a multipart/form-data
    const formData = new FormData();
    formData.set("Title", title);
    formData.set("Summary", summary);
    formData.set("File", file);
    formData.set("Content", content);

    // Retrieving the authentication token from local storage
    const token = localStorage.getItem("token");

    // Sending a POST request to the server endpoint '/newpost'
    const response = await fetch("http://localhost:4000/newpost", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `${token}`,
      },
      credentials: "include",
    });

    // Handling the response from the server
    if ((await response.json()) === "ok") {
      // If the response is 'ok', navigate to the home page
      navigate("/");
    } else {
      // If there's an error, show an alert
      alert("Error! Fill all fields");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold-600 mb-6 text-center text-black-500">
        Create a Post
      </h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="w-full p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
            placeholder="Enter your title"
          />
        </div>
        <div>
          <label
            htmlFor="summary"
            className="text-sm font-medium text-gray-600"
          >
            Summary
          </label>
          <input
            type="text"
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            value={summary}
            className="w-full p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
            placeholder="Provide a brief summary"
          />
        </div>
        <div>
          <label htmlFor="file" className="text-sm font-medium text-gray-600">
            Choose a File
          </label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className="w-full p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="text-lg font-semibold text-gray-700"
          >
            Content
          </label>
          <ReactQuill
            onChange={(Content) => setContent(Content)}
            className="QuillContent border rounded p-3"
            theme="snow"
            value={content}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white text-xl p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
