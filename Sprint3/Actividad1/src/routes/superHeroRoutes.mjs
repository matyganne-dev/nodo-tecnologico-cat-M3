import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    borrarSuperheroeController,
    borrarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

//Rutas (GET)
router.get('/superheroes', obtenerTodosLosSuperheroesController);
router.get('/superheroes/edad/mayorA30', obtenerSuperheroesMayoresDe30Controller);
router.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/superheroes/id/:id', obtenerSuperheroePorIdController);

//POST
router.post('/superheroes', crearSuperheroeController);

//PUT
//actualizacion superheroe ID
router.put('/superheroes/id/:id', actualizarSuperheroeController);

//DELETE

//Eliminacion superheroe por ID
router.delete('/superheroes/id/:id', borrarSuperheroeController);

//Eliminacion superheroe por Nombre
router.delete('/superheroes/nombre/:nombre', borrarSuperheroePorNombreController);

export default router;