import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Container, PostCard } from "../components";
import dbService from "../appwrite/db";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    dbService
      .getPosts()
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
        {/* Hero Section for unauthenticated users */}
        {!authStatus && (
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-100 mb-4">
              Where ideas{" "}
              <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                come alive
              </span>
            </h1>
            <p className="text-lg text-neutral-300/60 max-w-2xl mx-auto mb-8">
              A modern platform for sharing your thoughts, stories, and ideas
              with the world.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/signup">
                <button className="px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-accent-500/20">
                  Get Started
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-3 rounded-xl bg-transparent hover:bg-black/5 text-neutral-300 font-medium text-sm border border-glass-border transition-all duration-200">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Posts Section */}
        {authStatus && (
          <div className="mb-10 animate-fade-in">
            <h2 className="text-2xl font-bold text-neutral-100 mb-1">
              Latest Posts
            </h2>
            <p className="text-sm text-neutral-300/50">
              Discover what&apos;s new from the community
            </p>
          </div>
        )}

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
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold text-neutral-100 mb-2">
              No posts yet
            </h3>
            <p className="text-neutral-300/50 text-sm">
              {authStatus
                ? "Be the first to share something!"
                : "Sign in to start reading and writing."}
            </p>
            {authStatus && (
              <Link
                to="/add-post"
                className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium transition-all duration-200"
              >
                Create a post
              </Link>
            )}
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

export default Home;
