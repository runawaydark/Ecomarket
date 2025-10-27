import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { badRequest, ok } from '../utils/http.js';

export async function checkout(req, res) {
  // Creamos un pedido a partir del carrito activo del usuario
    const cart = await Cart.findOne({ user: req.user.id, status: 'ACTIVE' }).populate('items.product', 'price name');
    if (!cart || cart.items.length === 0) return badRequest(res, 'Carrito vacío');

    const items = cart.items.map(i => ({
    product: i.product._id,
    quantity: i.quantity,
    unitPrice: i.unitPrice
    }));
  const total = items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);

    const order = await Order.create({
    user: req.user.id,
    items,
    total,
    status: 'PAID',            // en MVP lo dejamos pagado (mock)
    paymentRef: `MOCK-${Date.now()}`
    });

    cart.status = 'CHECKED_OUT';
    await cart.save();

    return ok(res, order);
}

export async function myOrders(req, res) {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    return ok(res, orders);
}
