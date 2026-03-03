import express from 'express';

// Crear una instancia de Express
const app = express();

// Configurar el puerto en el que el servidor escuchara
const PORT = 3000;

// Ruta basica
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});



// Ruta GET para el home
// Solicitud: http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Página de inicio');
});

// Ruta GET para recibir datos simples
// Solicitud: http://localhost:3000/data
app.get('/data', (req, res) => {
    res.send('Datos recibidos');
});

