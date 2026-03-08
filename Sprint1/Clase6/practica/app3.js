import express from 'express';
import superheroes from './superheroes.json' with { type: 'json' };


// Crear una instancia de Express 
const app = express();

// Configurar el puerto en el que el servidor escuchará 
const PORT = 3000;

// Ruta GET con parámetro de ruta 
// Solicitud: http://localhost:3000/superheroes/123 
app.get('/superheroes/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Perfil del usuario con ID: ${userId}`);
});

// Ruta GET con múltiples parámetros 
// Solicitud: http://localhost:3000/superheroes/volar/2
app.get('/superheroes/:poder/:id', (req, res) => {
    const { poder, id } = req.params;
    res.send(`Poder: ${poder}, ID del superhero: ${id}`);
});

// Iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});