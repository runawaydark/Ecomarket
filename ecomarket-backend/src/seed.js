import 'dotenv/config';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function run() {
    await mongoose.connect(MONGODB_URI);
    console.log('DB ok');

    await Category.deleteMany({});
    await Product.deleteMany({});

    const frutas = await Category.create({ name: 'Frutas', description: 'Fruta fresca' });
    const verduras = await Category.create({ name: 'Verduras', description: 'Verdura fresca' });

    await Product.create([
    { name: 'Manzana', price: 1000, category: frutas._id, stock: 100, imageUrl: '' },
    { name: 'Plátano', price: 800, category: frutas._id, stock: 120, imageUrl: '' },
    { name: 'Lechuga', price: 700, category: verduras._id, stock: 60, imageUrl: '' }
    ]);

    console.log('Seed done');
    await mongoose.disconnect();
}
run().catch(e => console.error(e));
