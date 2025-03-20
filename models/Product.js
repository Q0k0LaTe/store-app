import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
name: { type: String, required: true },
description: String,
price: { type: Number, required: true },
imageUrl: String,
});
export default mongoose.model('Product', productSchema);
