import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

function PostCard({ $id, title, slug, featuredImage }) {
  return (
    <Link to={`/post/${slug}`}>
      <div className="w-full rounded-xl bg-gray-100 p-4">
        <div className="mb-4 w-full justify-center">
          <img
            src={storageService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>

        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;

