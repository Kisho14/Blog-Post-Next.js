import { handleGithubLogin } from "@/lib/action";
import React from "react";

const LoginPage =async () => {

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Sign In with GitHub</button>
      </form>
      <form action={login}>
        <input type="text" placeholder="username" name="username"/>
        <input type="text" placeholder="password" name="password"/>
        <button>Login with Credentials</button>
      </form>
    </div>
  );
};

export default LoginPage;
