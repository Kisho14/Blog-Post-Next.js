import React from "react";
import styles from "./registerForm.module.css";

const RegisterForm = () => {
  return (
    <form className={styles.form} action={register}>
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
