import express from 'express';
import {
    obtenerTodosLosPaisesController,
    agregarPaisFormController,
    crearPaisController,
    editarPaisFormController,
    actualizarPaisController,
    borrarPaisController,
    restaurarPaisesController
} from '../controllers/countriesController.mjs';
import { validarPais } from '../validators/countryValidator.mjs';
import { handleValidationErrors } from '../middlewares/errorHandler.mjs';

const router = express.Router();

router.get('/', obtenerTodosLosPaisesController);

router.get('/agregar', agregarPaisFormController);
router.post('/agregar', validarPais, handleValidationErrors, crearPaisController);

router.post('/restaurar', restaurarPaisesController);

router.get('/:id/editar', editarPaisFormController);
router.put('/:id/editar', validarPais, handleValidationErrors, actualizarPaisController);

router.delete('/:id', borrarPaisController);


export default router;