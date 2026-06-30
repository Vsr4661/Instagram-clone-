import { createContext, useState } from "react";
import { posts as initialPosts } from "../data/posts";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}