import { useState } from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

function PostCard({ $id, title, slug, featuredImage }) {
  const postSlug = $id || slug;
  const [imageError, setImageError] = useState(false);
  const imageUrl = featuredImage ? storageService.getFilePreview(featuredImage) : "";

  return (
    <Link to={`/post/${postSlug}`} className="group block">
      <div className="glass-card glass-card-hover overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-accent-500/5">
        <div className="aspect-[16/10] overflow-hidden bg-neutral-800/40 relative flex items-center justify-center">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 text-neutral-400 p-4 text-center">
              <span className="text-2xl font-bold text-accent-400/80 mb-1">Inkwell</span>
              <span className="text-xs text-neutral-500 line-clamp-1">{title}</span>
            </div>
          )}
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
