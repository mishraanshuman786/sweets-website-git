// cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User schema
    required: true,
    unique: true // Ensure uniqueness for the user field
  },
  cartItems: {},
});

export const Cart = mongoose.models.cart || mongoose.model('cart', cartSchema);



