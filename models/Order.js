import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:
true },
products: [
{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',
required: true },
quantity: { type: Number, default: 1 },
},
],
createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Order', orderSchema);
