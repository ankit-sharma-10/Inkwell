import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

import { Button, Container } from "../components";
import dbService from "../appwrite/db";
import storageService from "../appwrite/storage";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    post && userData ? post.userId === userData.$id : false;

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
      });
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

  if (!post) {
    return null;
  }

  return (
    <div className="py-8">
      <Container>
        <div className="relative mb-4 flex w-full justify-center rounded-xl border p-2">
          <img
            src={storageService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.slug}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="mb-6 w-full">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  );
}

