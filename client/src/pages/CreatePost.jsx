import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  return (
    <form className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-r from-blue-200 to-purple-300 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Create a New Post</h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-black text-sm font-semibold mb-2"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Enter your title"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="summary"
          className="block text-black text-sm font-semibold mb-2"
        >
          Summary
        </label>
        <input
          type="text"
          name="summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          placeholder="Enter a summary"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="file"
          className="block text-black text-sm font-semibold mb-2"
        >
          Upload File
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-black text-sm font-semibold mb-2"
        >
          Content
        </label>
        <ReactQuill
          className="border rounded-md bg-white text-gray-800 p-4"
          value={content}
          modules={modules}
          formats={formats}
        />
      </div>

      <button className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300">
        Publish
      </button>
    </form>
  );
}
