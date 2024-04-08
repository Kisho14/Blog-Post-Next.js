import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { connectToDb } from "./utils";
import { User } from "./models";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [ // Using this provider we can create the user session
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks:{
    async signIn({user, account, profile}) {
      console.log(profile)
      if(account.provider === 'github'){
        connectToDb();
        try{

          const user = await User.findOne({email: profile.email})

          if(!user){
            const newUser = new User({
              username: profile.name,
              email: profile.email,
              img: profile.avatar_url
            });

            await newUser.save();
          }

        }catch(err){
          console.log(err)
          return false;
        }
      }
      return true;
    }
  }
});
