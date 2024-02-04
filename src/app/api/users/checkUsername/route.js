import { User } from "@/library/model/user";
import mongoose from "mongoose";
import { connectionSrc } from "@/library/db";
import {NextResponse} from "next/server";
export async function GET(req){
    try {
        // fetching the username from params
        const searchParams = req.nextUrl.searchParams;
        const username = searchParams.get("username");
    
        // if username is not getting from params
        if (!username) {
          return NextResponse.json({ status: true, error: "Username is required." });
        }

        // connecting with mongodb database
    await mongoose.connect(connectionSrc, {
        useNewUrlParser: true,
      });
    
        // Check if the username exists in the database
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
          // If user exists, return user data
          return NextResponse.json({exists:{ status: true, error:"Username already exists. Please choose a different one." }});
        } else {
          // If user doesn't exist, return false status
          return NextResponse.json({exists:{ status: false }});
        }
      } catch (error) {
        return NextResponse.json({exists:{ status: true, error: "Internal Server Error" }});
      }
}