import express from 'express';
import { usuarios } from './datos/usuarios.js';
import { productos } from './datos/productos.js';

// Crear una instancia de Express
const app = express();

// Configurar el puerto en el que el servidor escuchara
const PORT = 3002;


// Ruta GET con parametro de ruta

// Solicitud: http://localhost:3002/user/1
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const usuario = usuarios.find(user => user.id === userId);

    if (usuario) {
        res.send(`Perfil de ${usuario.nombre} - Empresa: ${usuario.empresa}`);
    } else {
        res.send(`No existe el usuario con ID ${userId}`);
    }
});

// Ruta con MÚLTIPLES parámetros

// Solicitud: http://localhost:3002/product/electronics/1
app.get('/product/:category/:id', (req, res) => {
    const category = req.params.category;
    const id = parseInt(req.params.id);

    // Buscar en la "BASE DE DATOS" (productos.js)
    const producto = productos.find(product => product.categoria === category && product.id === id);

    if (producto) {
        res.send(`Producto: ${producto.nombre} | Precio: $${producto.precio}`);
    } else {
        res.send(`No existe producto con categoría "${category}" e ID ${id}`);
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

