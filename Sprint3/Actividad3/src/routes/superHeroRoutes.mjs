import express from 'express';
import { validarSuperheroe } from '../validators/superHeroValidator.mjs';
import { handleValidationErrors } from '../middlewares/errorHandler.mjs';
import {
    obtenerTodosLosSuperheroesController,
    crearSuperheroeController,
    obtenerSuperheroePorIdController,
    obtenerSuperheroesMayoresDe30Controller,
    buscarSuperheroesPorAtributoController,
    editarSuperheroeFormController,
    actualizarSuperheroeController,
    borrarSuperheroeController
} from '../controllers/superheroesController.mjs';

const router = express.Router();


// RUTAS DEL DASHBOARD (TP 3 - Etapas 2 y 3) despues de la limpieza

// GET /heroes/ -> Ver la lista principal (Dashboard)
router.get('/', obtenerTodosLosSuperheroesController);

// GET /heroes/agregar -> Ver el formulario de alta
router.get('/agregar', (req, res) => {
    res.render('addSuperhero');
});

// POST /heroes/agregar -> Procesar los datos del formulario y crear el héroe
router.post('/agregar',
    validarSuperheroe, // 1 Inspecciona y anotamo los errores
    handleValidationErrors, // 2 Revisa req y decide si pasa al controlador
    crearSuperheroeController // 3 pasa al controlador y continua con el proceso
);


// GET /heroes/:id/editar -> Muestra el formulario con los datos precargados (Etapa 4)
router.get('/:id/editar', editarSuperheroeFormController);

// PUT /heroes/:id/editar -> Procesa la actualización (Etapa 4)
router.put('/:id/editar', 
    validarSuperheroe, 
    handleValidationErrors, 
    actualizarSuperheroeController
);

// DELETE /heroes/:id -> Eliminar superhéroe
router.delete('/:id', borrarSuperheroeController);


// RUTAS DE CONSULTA (Mantenidas del TP 2) despues de la limpieza

// GET /heroes/edad/mayorA30
router.get('/edad/mayorA30', obtenerSuperheroesMayoresDe30Controller);

// GET /heroes/atributo/:atributo/:valor
router.get('/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);

// GET /heroes/id/:id
router.get('/id/:id', obtenerSuperheroePorIdController);

export default router;