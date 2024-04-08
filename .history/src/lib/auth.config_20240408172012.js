//This file is writened because of middleware. Because middleware shouldn't depends on any dependencies
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      console.log(auth);
      return true;
    },
  },
};
