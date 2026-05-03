import express from 'express';
import { validarSuperheroe } from '../validators/superHeroValidator.mjs';
import { handleValidationErrors } from '../middlewares/errorHandler.mjs';
import {
    obtenerTodosLosSuperheroesController,
    crearSuperheroeController,
    editarSuperheroeFormController,
    actualizarSuperheroeController,
    borrarSuperheroeController
} from '../controllers/superheroesController.mjs';

const router = express.Router();


// RUTAS DEL DASHBOARD (TP 3 - Etapas 2 y 3) despues de la limpieza

// Lista principal (dashboard)
router.get('/', obtenerTodosLosSuperheroesController); 

// Formulario de agregar 
router.get('/agregar', (req, res) => {
    res.render('addSuperhero'); 
});

// Procesar alta
router.post('/agregar',
    validarSuperheroe, 
    handleValidationErrors, 
    crearSuperheroeController 
);

// Formulario de edición (Etapa 4)
router.get('/:id/editar', editarSuperheroeFormController);

// Procesar edición (Se usa PUT gracias a method-override)
router.put('/:id/editar', 
    validarSuperheroe, 
    handleValidationErrors, 
    actualizarSuperheroeController 
);

// Eliminar (Etapa 5)
router.delete('/:id', borrarSuperheroeController);

export default router;