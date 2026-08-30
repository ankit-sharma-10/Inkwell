import { useEffect, useState } from "react";

import { Container, PostCard } from "../components";
import dbService from "../appwrite/db";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dbService
      .getPosts([])
      .then((data) => {
        if (data) {
          setPosts(data.documents);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length === 0 ? (
          <div className="py-8 text-center">
            <h1 className="text-2xl font-bold">
              No posts available
            </h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="w-full p-2 md:w-1/2 lg:w-1/4"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
