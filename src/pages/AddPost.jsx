import { Container, PostForm } from "../components/index";

function AddPost() {
  return (
    <div className="py-10 sm:py-16">
      <Container>
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-neutral-100 mb-1">
            Create New Post
          </h1>
          <p className="text-sm text-neutral-300/50">
            Share your ideas with the world
          </p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
