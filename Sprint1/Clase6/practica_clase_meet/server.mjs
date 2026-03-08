import express from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/tareas', (req, res) => {
    res.json({ mensaje: "Aqui se listarian las tareas" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
