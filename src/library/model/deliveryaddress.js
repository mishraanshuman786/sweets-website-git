
import mongoose from 'mongoose';

const deliveryAddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User schema
    required: true,
    unique: true // Ensure uniqueness for the user field
  },
  addresses:[],
});

export const DeliveryAddress = mongoose.models.deliveryaddress || mongoose.model('deliveryaddress', deliveryAddressSchema);



