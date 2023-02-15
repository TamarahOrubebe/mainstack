import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
    },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', productsSchema);

