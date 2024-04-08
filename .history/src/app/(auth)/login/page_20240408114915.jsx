import { auth } from "@/lib/auth";
import React from "react";

const LoginPage =async () => {

  const session = await auth();

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Sign In with GitHub</button>
      </form>
    </div>
  );
};

export default LoginPage;
