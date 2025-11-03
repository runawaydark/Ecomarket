import 'dotenv/config';
import mongoose from 'mongoose';
import Category from './models/Category.js';
import Product from './models/Product.js';

dotenv.config();

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

await mongoose.connect(process.env.MONGO_URI);

const cats = await Category.insertMany([
    { name: 'Frutas',    slug: 'frutas' },
    { name: 'Verduras',  slug: 'verduras' },
    { name: 'Despensa',  slug: 'despensa' },
    { name: 'Ofertas',   slug: 'ofertas' }
]);

await Product.create({
    name: 'Manzana Fuji',
    price: 1200,
    stock: 100,
    image: '',
    category: cats[0]._id
});

console.log('Seed OK');
process.exit(0);
