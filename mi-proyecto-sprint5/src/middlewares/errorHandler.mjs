import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
        // Respondemos con 400 y la lista estructurada para las alertas de la interfaz
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: errors.array().map(err => ({
                campo: err.path,
                mensaje: err.msg // 'err.msg' contiene el texto configurado en countryValidator
            }))
        });
    }

    // Si no hay errores, continúa al controlador
    next(); 
};