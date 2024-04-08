// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

import { unstable_noStore } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

// export const getPosts = async () => {
//   try {
//     connectToDb();
//     const posts = await Post.find();
//     return posts;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch posts!");
//   }
// };

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    console.log(posts)
    return posts.map(post => ({
      _id: post._id,
      userId: post.userId,
      title: post.title,
      desc: post.desc,
      slug: post.slug,
      img: post.img
    }));
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};


// export const getPost = async (slug) => {
//   try {
//     connectToDb();
//     const post = await Post.find({ slug });
//     return post;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch post!");
//   }
// };

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug }).lean();
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};


export const getUser = async (id) => {
  unstable_noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
