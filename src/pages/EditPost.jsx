import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, PostForm } from "../components";
import dbService from "../appwrite/db";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    dbService
      .getPost({ slug })
      .then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch post:", error);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-10 sm:py-16">
        <Container>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4 animate-fade-in">
              <div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-neutral-300 text-sm">Loading post...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-neutral-100 mb-1">
            Edit Post
          </h1>
          <p className="text-sm text-neutral-300/50">
            Update your post details
          </p>
        </div>
        {post && (
          <div
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <PostForm post={post} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default EditPost;
