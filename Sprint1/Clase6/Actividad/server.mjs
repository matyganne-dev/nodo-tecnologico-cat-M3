import express from 'express';
import { obtenerSuperheroePorIdController, buscarSuperheroesPorAtributoController, obtenerSuperheroesMayoresDe30Controller } from './controllers/superheroesController.mjs';


const app = express();
const PORT = 3000;

app.get('/superheroes/buscar', buscarSuperheroesPorAtributoController);
app.get('/superheroes/mayores-de-edad', obtenerSuperheroesMayoresDe30Controller);
app.get('/superheroes/:id', obtenerSuperheroePorIdController);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});