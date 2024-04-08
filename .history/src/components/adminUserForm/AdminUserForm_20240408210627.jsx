"use client";

import { addUser } from "@/lib/action";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";

const AdminUserForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    img: "",
    isAdmin: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.success) {
      setFormState({
        name: "",
        email: "",
        password: "",
        img: "",
        isAdmin: "",
      });
    }
  };

  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form
      onSubmit={handleSubmit}
      action={formAction}
      className={styles.container}
    >
      <h1>Add New User</h1>
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <input type="text" name="img" placeholder="img" />
      <select name="isAdmin">
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
