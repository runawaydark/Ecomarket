import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    method: { type: String, enum: ['TARJETA', 'TRANSFERENCIA'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDIENTE', 'APROBADO', 'RECHAZADO'], default: 'PENDIENTE' },
    transactionRef: { type: String, default: () => Math.random().toString(36).substring(2, 10) }
}, { timestamps: true });

export default mongoose.model('Payment', PaymentSchema);
