import express from 'express';

const app = express();

const PORT = 3000;

// Ruta GET con parametro de ruta
// Solicitud http://localhost:3000/profile?edad=30

app.get('/profile', (req, res) => {
    const edad = req.query.edad;
    console.log(`Edad Recibida: ${edad}`);
    res.send(`Edad del perfil: ${edad}`);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
