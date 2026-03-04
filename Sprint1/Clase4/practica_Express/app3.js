import express from 'express';
import { productos } from './datos/productos.js';

const app = express();
const PORT = 3003;

// Buscar productos por nombre (query: ?nombre=algo)
// Solicitud: http://localhost:3003/search?nombre=notebook
app.get('/search', (req, res) => {
    const nombreBuscado = req.query.nombre;
    const resultados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())
    );
    res.send(resultados);
});

// Filtrar productos por rango de precio (query: ?min=10&max=100)
// Solicitud: http://localhost:3003/filter?min=100&max=1000
app.get('/filter', (req, res) => {
    const precioMinimo = parseInt(req.query.min);
    const precioMaximo = parseInt(req.query.max);
    const resultados = productos.filter(producto => 
        producto.precio >= precioMinimo && producto.precio <= precioMaximo
    );
    res.send(resultados);
});

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});