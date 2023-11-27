import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
      const {name,email,password}=await req.json();
    //   create hashed password
    const hashedPassword=await bcrypt.hash(password,10);
    // Database Code 
   await mongoose.connect(connectionSrc);  
    await User.create({name, email,password:hashedPassword});



    // 
      return NextResponse.json({message:"User Registered.",ok:true},{status:201});
    }catch(error )
    {
       console.log(error);
       NextResponse.json({message:"An error occurred while regsitering the user.",ok:false},{status:5000});
    }
}