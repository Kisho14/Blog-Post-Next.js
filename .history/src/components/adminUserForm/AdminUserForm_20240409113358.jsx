"use client";
import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

const AdminUserForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
    isAdmin: "",
  });

  const [state, formAction] = useFormState(addUser, undefined);

  useEffect(()=> {
    setFormState({
      name: "",
      email: "",
      password: "",
      img: "",
      isAdmin: "",
    });
  },[state])

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input type="text" name="username" placeholder="username" onChange={(event) => setFormState({ ...formState, name: event.target.value })}/>
      <input type="text" name="email" placeholder="email" onChange={(event) => setFormState({ ...formState, name: event.target.value })}/>
      <input type="password" name="password" placeholder="password" onChange={(event) => setFormState({ ...formState, password: event.target.value })}/>
      <input type="text" name="img" placeholder="img" onChange={(event) => setFormState({ ...formState, img: event.target.value })}/>
      <select name="isAdmin" onChange={(event) => setFormState({ ...formState, isAdmin: event.target.value })}>
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminUserForm;
