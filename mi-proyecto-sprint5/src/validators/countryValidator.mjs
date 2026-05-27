import { body } from 'express-validator';

export const validarPais = [
    body('officialName')
        .trim()
        .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres.'),
    
    body('capital')
        .trim()
        .notEmpty().withMessage('La capital es obligatoria.')
        .custom((value) => {
            const listaCapitales = value.split(',').map(c => c.trim());
            const todasValidas = listaCapitales.every(cap => cap.length >= 3 && cap.length <= 90);
            if (!todasValidas) {
                throw new Error('Cada capital ingresada debe tener entre 3 y 90 caracteres.');
            }
            return true;
        }),
        
    body('borders')
        .optional({ checkFalsy: true })
        .custom((value) => {
            if (!value) return true;
            const codigos = value.split(',').map(c => c.trim());
            const regex = /^[A-Z]{3}$/;
            const todosValidos = codigos.every(codigo => regex.test(codigo));
            if (!todosValidos) {
                throw new Error('Cada código de frontera debe tener exactamente 3 letras mayúsculas (ej: ARG, BRA).');
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