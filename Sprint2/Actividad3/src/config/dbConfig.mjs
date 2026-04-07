import mongoose from 'mongoose'

export async function connecBD() {
    try {
        await mongoose.connect('mongodb+srv://grupo-06:grupo-06@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
        console.log('Conexion exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
}