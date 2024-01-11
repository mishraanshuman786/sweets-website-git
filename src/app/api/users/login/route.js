import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";  
import Jwt from "jsonwebtoken";

export async function POST(request){
    try{

        await mongoose.connect(connectionSrc);
        const reqBody=await request.json();
        const {email,password}=reqBody;

        // check if user exists
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist."},{status:400})
        }

        // check if password is correct
        const validPassword=await bcryptjs.compare(password,user.password);

        if(!validPassword){
            return NextResponse.json({error:"Invalid Password."},{status:400});
        }

        // create token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        };

        // create token
        const token=await Jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:"1d"});

        const response=NextResponse.json({
            message:"Login Successful",
            id:user._id,
            username:user.username,
            email:user.email,
            status:true
        })

        response.cookies.set("token",token,{httpOnly:true});

        return response;


    }catch(error)
    {
        console.log("Error:",error.message);
        return NextResponse.json({error:error.message},{status:500});
    }
}