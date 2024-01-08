import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req){
    try{

        await mongoose.connect(connectionSrc);
        const {email}=await req.json();
        const user=await User.findOne({email}).select("_id")
        console.log("user:",user);
        return NextResponse.json({user});
    }catch(error){
        console.log(error);
    }
}