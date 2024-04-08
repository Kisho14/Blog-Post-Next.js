import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from 'bcrypt';


const login = async (credentials) =>{
  try{
    connectToDb();
    const user = User.findOne({usename: credentials.usename})

    if(!user){
      return "User not found"
    }
    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

    if(!isPasswordCorrect){
      throw new Error("Wrong credentials!")
    }

    return user;

  }catch(err){
    console.log(err)
    throw new Error("Failed to login")
  }
}

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
    CredentialsProvider({
async authorize(credentials){

}
    })
  ],
  callbacks:{
    async signIn({user, account, profile}) {
      // console.log(profile)
      if(account.provider === 'github'){
        connectToDb();
        try{

          const user = await User.findOne({email: profile.email})

          if(!user){
            const newUser = new User({
              username: profile.login,
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
