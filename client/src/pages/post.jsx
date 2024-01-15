import { Link } from "react-router-dom";
import { format } from "date-fns";

const Post = (props) => {
  return (
    <div className="container mx-auto">
      <Link to={`/${props._id}`} className="text-decoration-none">
        <div className="post bg-white shadow-lg p-6 rounded-lg transition duration-300 transform hover:shadow-lg hover:scale-105">
          <div className="image mb-4">
            <img
              src={props.Cover}
              alt={props.Title}
              className="w-full h-60 object-cover rounded-md border border-gray-300"
            />
          </div>
          <div className="content">
            <h1 className="text-2xl font-semibold text-blue-700 mb-2">
              {props.Title}
            </h1>
            <div className="info text-gray-700 flex items-center mb-2">
              <div className="author">By {props.Author.username}</div>
              <span className="mx-2">&middot;</span>
              <time className="text-gray-600">
                {format(new Date(props.updatedAt), "MMM d yyyy")}
              </time>
            </div>
            <p className="text-gray-800">{props.Summary}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
