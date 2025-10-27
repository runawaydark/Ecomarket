import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, default: 0 }
    },
    { timestamps: true }
);

export default mongoose.model('Product', productSchema);
