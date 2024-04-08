//This file is writened because of middleware. Because middleware shouldn't depends on any dependencies
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {

    //adding user id and some properties with the auth
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.isAdmin = token.isAdmin;
      }
    },
    authorized({ auth, request }) {
      console.log(auth);
      return true;
    },
  },
};
