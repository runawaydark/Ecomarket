import mongoose from 'mongoose';

export async function connectDB(uri) {
    try {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB Atlas');
    } catch (err) {
    console.error('Error al conectar con MongoDB:', err.message);
    process.exit(1);
    }
}
