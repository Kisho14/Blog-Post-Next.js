"use server";
import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcrypt";

export const addPost = async (prevState, formData) => {

  const { title, desc, slug, img, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({
      title,
      desc,
      img,
      userId,
      slug,
    });
  
    console.log(newPost)

    await newPost.save();
    console.log("saved to db");
    //The cache is invalid only when this path is accessed.
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    console.log("deleted from db");
    //The cache is invalid only when this path is accessed. and data's are refreshed.
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const addUser = async (prevState, formData) => {
  var { username, email, password, img, isAdmin } = Object.fromEntries(formData);

  console.log(username, email, password, img, isAdmin)

  if(img === "" || img === undefined){
    img = "/noavatar.png"
  }

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password,
      img,
      isAdmin
    });

    await newUser.save();
    console.log("saved to db");
    //The cache is invalid only when this path is accessed.
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };

  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();
    await Post.deleteMany({userId: id})
    await User.findByIdAndDelete(id);
    console.log("deleted from db");
    //The cache is invalid only when this path is accessed. and data's are refreshed.
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, fromData) => {
  const { username, email, password, passwordRepeat } =
    Object.fromEntries(fromData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username: username });

    if (user) {
      return { error: "Username already exists" };
    }

    // Encrypting the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User saved to the database");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
