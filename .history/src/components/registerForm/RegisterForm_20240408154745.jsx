"use client"
import React, { useEffect } from "react";
import styles from "./registerForm.module.css";
import { register } from "@/lib/action";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(()=>{
    state?.success && router.push('/login')
  },[state?.success, router])

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
      <p className={styles.errorMsg}>{state?.error}</p>
      
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
