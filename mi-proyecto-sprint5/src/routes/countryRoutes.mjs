import express from 'express';
import {
    obtenerTodosLosPaisesController,
    agregarPaisFormController,
    crearPaisController,
    editarPaisFormController,
    actualizarPaisController,
    borrarPaisController
} from '../controllers/countriesController.mjs';

const router = express.Router();

// Ruta principal para el Dashboard (Listar)
router.get('/', obtenerTodosLosPaisesController);

// Rutas para Agregar País
router.get('/agregar', agregarPaisFormController);
router.post('/agregar', crearPaisController);

// Rutas para Editar País
router.get('/:id/editar', editarPaisFormController);
router.put('/:id/editar', actualizarPaisController); // Se usará con method-override en el formulario

// Ruta para Eliminar País
router.delete('/:id', borrarPaisController);

export default router;