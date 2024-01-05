import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionSrc } from "@/library/db";
import { Payment } from "@/library/model/payment";

export async function POST(req){
    try{
        const { order_id, payment_id, signature, amount } = await req.json();
        await mongoose.connect(connectionSrc);
        await Payment.create({order_id, payment_id, signature, amount});

        return NextResponse.json(
            { message: "Payment Data is Saved in the Database.", ok: true },
            { status: 201 }
          );
    }catch(error)
    {
        console.log(error);
        NextResponse.json(
            { message: "An error occurred while saving the transaction details into the Database.", ok: false },
            { status: 500 }
          );
    }
}