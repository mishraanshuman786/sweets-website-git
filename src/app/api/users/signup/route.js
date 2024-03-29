import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";  


export async function POST(request){
    try{
           // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
      });
         const reqbody=await request.json();
         const {username,email,password}=reqbody;
       

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already Exists"},{status:400});
        }


        // Hash the Password 
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        // saving the user in the database
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        });

        const savedUser=await newUser.save();

       
         
        return NextResponse.json({
            message:"User Created Successfully.",
            status:true,
            savedUser
        })

    }catch(error){
       
        return NextResponse.json({error:error.message},{status:500})
    }
}