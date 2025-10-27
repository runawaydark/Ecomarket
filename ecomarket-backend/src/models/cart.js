import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
    {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 }
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    status: { type: String, enum: ['ACTIVE', 'CHECKED_OUT'], default: 'ACTIVE', index: true },
    items: [cartItemSchema]
    },
    { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
