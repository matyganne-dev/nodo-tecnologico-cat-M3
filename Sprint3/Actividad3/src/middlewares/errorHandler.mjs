


import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    // Captura,os los fallos que detectados en validarSuperheroe 
    const errors = validationResult(req); 

    if (!errors.isEmpty()) {
        // Si hay errores, respondemos con 400 y la lista de mensajes 
        return res.status(400).json({
            status: 'error',
            message: 'Error de validación',
            errors: errors.array().map(err => ({
                // El nombre del campo que fallo
                campo: err.path,
                // El mensaje que pusimos en .withMessage()
                mensaje: err.msg
            }))
        });
    }

    // Si no hay errores, permite que la petición siga al controlador
    next(); 
};
