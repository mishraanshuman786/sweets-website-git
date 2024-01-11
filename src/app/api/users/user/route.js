import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import {NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request,response){
    try{
          // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
      });
        const reqBody=await request.json();
        const {email}=reqBody;
        let userData=await User.findOne({email});

        return NextResponse.json({success:true,userData});
          
    }catch(error){
        
        return NextResponse.json({success:false});
    }
}