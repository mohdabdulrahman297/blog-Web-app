import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/getPosts/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((PostInfo) => {
        setTitle(PostInfo.Title);
        setSummary(PostInfo.Summary);
        setContent(PostInfo.Content);
      });
    });
  }, [id]);

  async function updatePost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("Title", title);
    formData.set("Summary", summary);
    formData.set("Content", content);
    formData.set("id", id);
    if (file) {
      formData.set("File", file);
    } else {
      formData.set("File", "");
    }

    const response = await fetch("http://localhost:4000/updatePost", {
      method: "PUT",
      body: formData,
    });
    if ((await response.json()) === "ok") {
      Navigate(`/${id}`);
    } else {
      alert("Error! fill all the fields");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold-600 mb-6 text-center text-black-500">
        Edit Post
      </h1>

      <form className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            value={title}
            className="w-full p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
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
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Summary"
            value={summary}
            className="w-full p-3 border-b-2 border-blue-400 focus:outline-none focus:border-blue-600"
          />
        </div>
        <div>
          <label htmlFor="file" className="text-sm font-medium text-gray-600">
            Choose a File
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
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
          onClick={updatePost}
          className="w-full bg-blue-500 text-white text-xl p-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
