import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";  


export async function POST(request){
    try{
         await mongoose.connect(connectionSrc);
         const reqbody=await request.json();
         const {username,email,password}=reqbody;
         console.log(reqbody);

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

        console.log(savedUser);
         
        return NextResponse.json({
            message:"User Created Successfully.",
            status:true,
            savedUser
        })

    }catch(error){
        console.log("Error:",error.message);
        return NextResponse.json({error:error.message},{status:500})
    }
}