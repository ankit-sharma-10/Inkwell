import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, PostForm } from "../components";
import dbService from "../appwrite/db";

function EditPost() {
  const [post, setPost] = useState(null);
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
      });
  }, [slug, navigate]);

  return (
    <div className="py-8">
      {post && (
        <Container>
          <PostForm post={post} />
        </Container>
      )}
    </div>
  );
}

export default EditPost;

