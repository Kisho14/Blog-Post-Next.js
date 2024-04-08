import { addPost, deletePost, sayHello } from "@/lib/action";
import React from "react";

const ServerActionTestPage = () => {

  // const serverActionInComp = async () => {
  //   "use server";
  //   console.log("It works!");
  // };

  return (
    <div>
      <form action={addPost}>
        <input type="text" placeholder="title" name="title"/>
        <input type="text" placeholder="desc" name="desc"/>
        <input type="text" placeholder="slug" name="slug"/>
        <input type="text" placeholder="userId" name="userId"/>
        <button>Create Post</button>
      </form>

      <form action={deletePost}>
        <input type="text"  placeholder="post id" name="id"/>
        <button>Delete Post</button>
      </form>
    </div>
  );
};

export default ServerActionTestPage;
