import React from "react";
import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";
import Image from "next/image";

// FETCH DATA WITH AN API
// const getUserData = async (userId) => {
//     try {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/users/${userId}`
//       );
//       const user = await res.json();
//       return user;
//     } catch (error) {
//       console.error(error);
//       throw new Error("Something went wrong");
//     }
//   };

const PostUser = async ({ userId }) => {
  // FETCH DATA WITH AN API
  // const user = await getUserData(userId)

  // FETCH DATA WITHOUT AN API
  const user = await getUser(userId);

  return (
    <div className={styles.container}>
      {user.img && <Image
        className={styles.avatar}
        src={user.img}
        alt="Avatar Image"
        width={50}
        height={50}
      />}
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.userName}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
