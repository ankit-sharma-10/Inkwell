import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

function PostCard({ title, slug, featuredImage }) {
  return (
    <Link to={`/post/${slug}`} className="group block">
      <div className="glass-card glass-card-hover overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-accent-500/5">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={storageService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h2 className="text-lg font-semibold text-neutral-100 line-clamp-2 group-hover:text-accent-400 transition-colors duration-200">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
