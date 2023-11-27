import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import bcrypt from "bcryptjs";

const authOptions={
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{},
            async authorize(credentials){
              const {email,password}=credentials;
               try{
                  await mongoose.connect(connectionSrc);
                 const user=await User.findOne({email});

                  if(!user){
                    
                    return null;
                  }

               const passwordsMatch=await bcrypt.compare(password,user.password);
               console.log(passwordsMatch);
               if(passwordsMatch===false){
               return false;
               }
               else{
                return true;
               }

               }catch(error){
                  console.error(error);
               }
            },

        }),
    ],
    session:{
        strategy:"jwt",
        
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    },

}

const handler=NextAuth(authOptions);
export {handler as GET, handler as POST};
