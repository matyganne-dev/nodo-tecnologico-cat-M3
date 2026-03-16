import { setServers } from 'node:dns/promises';
import mongoose from 'mongoose';

setServers(["1.1.1.1", "8.8.8.8"]);


mongoose.connect('mongodb+srv://unimaty10:BDmatyprueba10@cluster0.64dpheo.mongodb.net/Node-js')
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));