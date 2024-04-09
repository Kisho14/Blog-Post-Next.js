import React from "react";
import styles from "./blog.module.css";
import PostCard from "@/components/postCard/postCard";
import { getPosts } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async () => {
  // const res = await fetch("http://localhost:3000/api/blog", {cache: "no-store"});
  const res = await fetch(`${process.env.API_URL}/blog`, {cache: "no-store"});
  if (!res.ok) {
    throw new Error("Something went worng");
  }
  return res.json();
};

const BlogPage = async () => {
  // FETCH DATA WITH AN API
  const posts = await getData();

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div key={post._id} className={styles.post}>
          <PostCard post={post}/>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
