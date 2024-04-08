"use client"
import React, { useEffect } from "react";
import styles from "./loginForm.module.css";
import { login } from "@/lib/action";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const router = useRouter();

//   useEffect(()=>{
//     state?.success && router.push('/login')
//   },[state?.success, router])

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      <span className={styles.errorMsg}>{state?.error}</span>
      <Link href="/Register">
        {"Don't have an account?"} <b>Login</b>
      </Link>
    </form>
  );
};

export default LoginForm;
