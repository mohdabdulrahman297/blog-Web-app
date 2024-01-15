import { useEffect, useState } from "react";
import Post from "./post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/getPosts", {
      method: "GET",
    }).then((response) => {
      response.json().then((Posts) => {
        setPosts(Posts);
      });
    });
  }, []);

  function handleSearch(search) {
    const searchResults = posts.filter((post) =>
      post.Title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(searchResults);
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <input
          type="text"
          placeholder="Search"
          className="w-full md:w-2/3 p-3 xl:ml-8 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:ml-8 gap-8">
          {(searchResults.length > 0 ? searchResults : posts).map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
