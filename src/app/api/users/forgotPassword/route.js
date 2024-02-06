import { NextResponse } from "next/server";
import { connectionSrc } from "@/library/db";
import { User } from "@/library/model/user";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
export async function PUT(request) {
  try {
    const { username, password } = await request.json();

      // Hash the Password 
      const salt=await bcryptjs.genSalt(10);
      const hashedPassword=await bcryptjs.hash(password,salt);


    // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
    });

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user exists, update their password
    if (user) {
      user.password = hashedPassword;
      await user.save();

      return NextResponse.json({
        status: true,
        message: `${username} , Your Password updated successfully!`,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "User not found with this Username",
      });
    }

    return NextResponse.json({
        status: true,
        message: `${username} , Your Password updated successfully!`,
      });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      message: "There is some error in Reseting the Password!",
    });
  }
}
