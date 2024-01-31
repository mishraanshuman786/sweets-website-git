import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User schema
    required: true,
  },
  orderId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  amount: {
    type: Number
  },
  productDetails: [],
  paymentMode: {
    type: String,
    enum: ['cash on delivery', 'pay online'] // Use 'enum' to specify allowed values
  },
  orderCompleted: {
    type: Boolean,
    default: false // Set default value to false, indicating that the order is not completed initially
  },
  createdAt: {
    type: Date,
    default: Date.now // Set default value to the current date and time
  },
});

export const Order = mongoose.models.order || mongoose.model('order', orderSchema);
