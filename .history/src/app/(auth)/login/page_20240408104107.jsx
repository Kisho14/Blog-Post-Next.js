import { auth, signIn } from "@/lib/auth";
import React from "react";

const LoginPage =async () => {
  const session = await auth();

   const handleGithubLogin = async () => {
    "use server";

    await signIn("github");
  };

  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Sign In with GitHub</button>
      </form>
    </div>
  );
};

export default LoginPage;
