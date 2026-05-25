import { body } from 'express-validator';

export const validarPais = [
    body('name.official')
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),
    
    body('capital')
        .trim()
        .notEmpty().withMessage('La capital es obligatoria y debe tener entre 3 y 90 caracteres.'),
        
    body('borders')
        .optional({ checkFalsy: true })
        .custom((value) => {
            // Si el usuario ingresa códigos separados por coma (ej: ARG,BRA) los validamos
            if (!value) return true;
            const codes = value.split(',').map(c => c.trim());
            const regex = /^[A-Z]{3}$/;
            const allValid = codes.every(code => regex.test(code));
            if (!allValid) {
                throw new Error('Cada código de frontera (border) debe ser de 3 letras mayúsculas (ej: ARG, BRA).');
            }
            return true;
        }),

    body('area')
        .isFloat({ min: 0.01 }).withMessage('El área debe ser un número positivo.'),

    body('population')
        .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo.'),

    body('gini')
        .optional({ checkFalsy: true })
        .isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe ser un número entre 0 y 100.')
];