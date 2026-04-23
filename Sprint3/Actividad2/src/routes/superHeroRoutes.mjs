import express from 'express';
import { validarSuperheroe } from '../validators/superHeroValidator.mjs'; 
import { handleValidationErrors } from '../middlewares/errorHandler.mjs';
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



// POST: Crear un nuevo superhroe
router.post('/superheroes', 
    validarSuperheroe,      // 1 Inspecciona y anotamo los errores 
    handleValidationErrors, // 2 Revisa req y decide si pasa al controlador
    crearSuperheroeController // 3 pasa al controlador y continua con el proceso 
);

// PUT: Actualizar un superheroe por ID
router.put('/superheroes/id/:id', 
    validarSuperheroe, 
    handleValidationErrors, 
    actualizarSuperheroeController
);

//DELETE

//Eliminacion superheroe por ID
router.delete('/superheroes/id/:id', borrarSuperheroeController);

//Eliminacion superheroe por Nombre
router.delete('/superheroes/nombre/:nombre', borrarSuperheroePorNombreController);

export default router;