import express from 'express';

// Crear una instancia de Express
const app = express();

// Configurar el puerto en el que el servidor escuchara
const PORT = 3001;

// Ruta GET para el home
// Solicitud: http://localhost:3001/
app.get('/', (req, res) => {
    res.send('Página de inicio');
});

// Ruta GET para recibir datos simples
// Solicitud: http://localhost:3001/data
app.get('/data', (req, res) => {
    res.send('Datos recibidos');
});

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
