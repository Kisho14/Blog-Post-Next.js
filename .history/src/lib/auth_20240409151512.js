import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectToDb();
    // console.log(credentials)
    const user = await User.findOne({ username: credentials.username });

    // console.log(user);

    if (!user) {
      return "User not found";
    }

    // console.log(user.password);
    // console.log(credentials.password);
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    // Using this provider we can create the user session
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        // console.log("Hey there!");
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log(profile)
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
