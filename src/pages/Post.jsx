import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { Button, Container } from "../components";
import dbService from "../appwrite/db";
import storageService from "../appwrite/storage";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

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

  const deletePost = async () => {
    try {
      const status = await dbService.deletePost({ slug: post.slug });

      if (status) {
        if (post.featuredImage) {
          await storageService.deleteFile(post.featuredImage);
        }

        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return (
      <div className="py-10">
        <Container>
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="aspect-[2/1] skeleton mb-8 rounded-2xl" />
            <div className="h-8 skeleton w-2/3 mb-4" />
            <div className="space-y-3">
              <div className="h-4 skeleton w-full" />
              <div className="h-4 skeleton w-5/6" />
              <div className="h-4 skeleton w-4/6" />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="py-10">
      <Container>
        <article className="max-w-4xl mx-auto animate-fade-in">
          {/* Featured Image */}
          <div className="relative mb-8 rounded-2xl overflow-hidden border border-glass-border">
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full object-cover max-h-[500px]"
            />

            {/* Author Actions Overlay */}
            {isAuthor && (
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Link to={`/edit-post/${post.slug}`}>
                  <Button variant="success" className="text-xs px-4 py-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={deletePost}
                  className="text-xs px-4 py-2"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-100 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose-dark">{parse(post.content)}</div>
        </article>
      </Container>
    </div>
  );
}
