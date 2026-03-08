import express from 'express';
import superheroes from './superheroes.json' with { type: 'json' };


// Crear una instancia de Express 
const app = express();

// Configurar el puerto en el que el servidor escuchará 
const PORT = 3000;

// Ruta GET con parámetro de ruta 
// Solicitud: http://localhost:3000/search?q=superman
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Resultado de busqueda para: ${query}`);
});

// Ruta GET con múltiples parámetros 
// Solicitud: http://localhost:3000/filter?debilidad=kriptonita&edad=30&id=1
app.get('/filter', (req, res) => {
    const { debilidad, edad, id } = req.query;
    res.send(`Debilidad: ${debilidad}, edad: ${edad}, ID: ${id}`);
});

// Iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});