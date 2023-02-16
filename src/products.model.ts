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
const Product =  mongoose.model('Product', productsSchema);
export default Product;

