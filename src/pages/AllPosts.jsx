import { useEffect, useState } from "react";

import { Container, PostCard } from "../components";
import dbService from "../appwrite/db";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full py-10 sm:py-16">
      <Container>
        <div className="mb-10 animate-fade-in">
          <h1 className="text-2xl font-bold text-neutral-100 mb-1">
            All Posts
          </h1>
          <p className="text-sm text-neutral-300/50">
            Browse every post on the platform
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <div className="aspect-[16/10] skeleton" />
                <div className="p-5 space-y-3">
                  <div className="h-5 skeleton w-3/4" />
                  <div className="h-4 skeleton w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="py-20 text-center animate-fade-in">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">
              No posts found
            </h3>
            <p className="text-neutral-300/50 text-sm">
              There are no posts to display right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
