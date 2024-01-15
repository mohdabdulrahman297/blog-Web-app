import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format } from "date-fns";
import { LuSendHorizonal } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

export default function ViewPost() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [comment, setComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const Navigate = useNavigate();

  // Effect for initial data fetch
  useEffect(() => {
    fetch(`http://localhost:4000/getPosts/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((Post) => {
        setPostInfo(Post);
      });
    });
  }, [id]);

  // Effect for handling post updates
  useEffect(() => {
    // Avoid fetching data when postInfo is updated
    if (postInfo && postInfo._id === id) {
      return;
    }

    fetch(`http://localhost:4000/getPosts/${id}`, {
      method: "GET",
    }).then((response) => {
      response.json().then((Post) => {
        setPostInfo(Post);
      });
    });
  }, [id, postInfo]);

  if (!postInfo) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedPost = await fetch(`http://localhost:4000/getPosts/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userInfo?.username, content: comment }),
    }).then((response) => response.json());
    setPostInfo(updatedPost);
    setComment("");
  }

  async function deletePost() {
    try {
      const response = await fetch(`http://localhost:4000/deletePost/${id}`);
      if ((await response.json()) === "ok") {
        Navigate("/");
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-blue-700 font-bold mb-4">
          {postInfo.Title}
        </h1>
        <div className="text-gray-600 mb-2">
          By{" "}
          <Link to={`/userposts/${postInfo.Author?.username}`}>
            <span className="text-blue-500">@{postInfo.Author?.username}</span>
          </Link>
        </div>

        {userInfo?.username === postInfo.Author?.username && (
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to={`/editPost/${postInfo._id}`}
              className="flex items-center"
            >
              <button className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 text-white">
                <div className="flex flex-row">
                  <FiEdit className="mt-1 mr-2" /> EDIT
                </div>
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 text-white"
            >
              <div className="flex flex-row">
                <MdDelete className="mt-1 mr-2" />
                DELETE
              </div>
            </button>
          </div>
        )}

        <div className="mb-6 h-80 flex items-center justify-center">
          <img
            src={postInfo.Cover}
            alt={postInfo.Title}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div
          className="content text-gray-700"
          dangerouslySetInnerHTML={{ __html: postInfo.Content }}
        ></div>

        <div className="comment-container mt-8">
          {postInfo.Comments &&
            postInfo.Comments.length > 0 &&
            postInfo.Comments.map((Comment) => (
              <div key={Comment.id} className="single-comment mb-4">
                <div className="comment-info text-gray-600 flex items-center mb-2">
                  <span className="user mr-2">{Comment.user}</span>
                  <span className="comment-date">
                    {format(new Date(Comment.createdAt), "MMM d yyyy")}
                  </span>
                </div>
                <span className="text-gray-800">{Comment.content}</span>
                <hr className="my-2" />
              </div>
            ))}
        </div>

        {userInfo?.username && (
          <div className="comments mt-8">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                required={true}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder="Add a comment.."
                value={comment}
                className="w-full p-2 border-b border-gray-400 focus:outline-none"
              />
              <button className="ml-4 mt-3 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">
                <LuSendHorizonal />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
