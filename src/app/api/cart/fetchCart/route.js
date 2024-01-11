import { connectionSrc } from "@/library/db";
import { Cart } from "@/library/model/cart";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request){
      try{
         // Connection with MongoDB
    await mongoose.connect(connectionSrc, {
      useNewUrlParser: true,
    });
        const reqBody=await request.json();
        const {id}=reqBody;

        const data=await Cart.findOne({user:id})
        console.log(data);
        return NextResponse.json({status:true,data:data});

      }catch(error){
        console.log("fetching cart error:",error.message);
        return NextResponse.json({status:false});
      }
}