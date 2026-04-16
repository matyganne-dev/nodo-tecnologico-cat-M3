import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/superheroes', obtenerTodosLosSuperheroesController);
router.get('/superheroes/edad/mayorA30', obtenerSuperheroesMayoresDe30Controller);
router.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/superheroes/id/:id', obtenerSuperheroePorIdController);

export default router;