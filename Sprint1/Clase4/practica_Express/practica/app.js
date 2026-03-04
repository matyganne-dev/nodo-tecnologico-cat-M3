import express from 'express';

// Crear una instancia de Express
const app = express();

// Configurar el puerto en el que el servidor escuchara
const PORT = 3000;

// Ruteo basico
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Iniciar el servidor

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

