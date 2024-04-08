import LoginForm from "@/components/loginForm/LoginForm";
import { handleGithubLogin, login } from "@/lib/action";
import React from "react";

const LoginPage =async () => {

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Sign In with GitHub</button>
      </form>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
