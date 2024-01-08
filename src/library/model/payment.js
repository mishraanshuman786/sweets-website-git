import mongoose from "mongoose";

// creating products table schema
const paymentModel = new mongoose.Schema(
    {
        order_id:{type: String,required: true},
       payment_id:{type: String,required: true},
       signature:{type: String,required: true},
       amount:{type: String,required: true},
    },
    { timestamps: true },


);

// connection products table with productModel schema
export const Payment =
  mongoose.models.payment || mongoose.model("payment", paymentModel);