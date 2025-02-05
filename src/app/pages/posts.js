// pages/posts.js
import PostList from "../app/components/PostList";
import { useState } from "react";
import { useUsersAndPosts } from "./Hooks/useUsersAndPosts"; // Assuming this hook fetches posts

export default function Posts() {
  const { posts, loading, error, fetchPosts } = useUsersAndPosts();
  const [activeUser, setActiveUser] = useState(null);

  return (
    <div>
      <h2 className="text-xl font-semibold">Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PostList posts={posts} />
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
