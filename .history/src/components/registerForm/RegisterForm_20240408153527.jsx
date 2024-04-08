import React from "react";
import styles from "./registerForm.module.css";
import { register } from "@/lib/action";
import { useFormState } from "react-dom";

const RegisterForm = () => {
    const [state, formAction] = useFormState(register, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="email" placeholder="email" name="email" />
      <input type="password" placeholder="password" name="password" />
      <input
        type="password"
        placeholder="password again"
        name="passwordRepeat"
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
