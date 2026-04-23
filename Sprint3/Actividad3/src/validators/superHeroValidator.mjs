






/* Explicacion breve ayuda memoria

    body('campo'): Señala qué dato exacto del formulario vamos a revisar.

    .trim(): Esto limpia los espacios vacíos que el usuario, al principio y al final.

    .notEmpty(): Es el obligatorio, no permite que el campo llegue vacío.

    .isLength({ min: 3, max: 60 }): Pone límites de tamaño para la cadena ingresada.

    .isNumeric() e .isInt({ min: 0 }): Se asegura de que no se manden letras donde van números y como mínimo, sea 0.

    .isArray({ min: 1 }): Revisa que los datos vengan en una lista y no como un texto suelto.

    .custom(...): Regla especial que inventamos nosotros para casos complejos.

    .withMessage('...'): Es el mensaje de error que explica qué falló.

    express-validator: Middleware para asegurar que los datos que entran a la base de datos son válidos.

    .customSanitizer(): Herramienta para transformar datos de entrada antes de que lleguen al controlador.

    req.body: Objeto que contiene los datos del formulario procesados por urlencoded.

    A diferencia de C typeof en js lo usamos para preguntar, en c lo usabamos para definir.




    requerimientos:

    nombreSuperheroe debe validarse que sea requerido, no tenga espacios en blanco(trim), 
    una longitud minima de 3 caracteres y una longitud maxima de 60

    nombreReal debe validarse que sea requerido, no tenga espacios en blanco(trim), una 
    longitud minima de 3 caracteres y una longitud maxima de 60

    edad debe validarse que sea requerido, que sea un numero, no tenga espacios en blanco(trim), 
    valor minimo 0 (no admite edad negativa)

    poderes debe validarse que sea requerido, que sea un array de string cuyo tamaño no sea 0, 
    cada elemento no tenga espacios en blanco, cada elemento una longitud minima de 3 caracteres y una longitud maxima de 60


    Explicacion:

    validarSuperheroe : Este archivo no frena las peticiones, aqui se revisan los datos y se va registrando por detras en req

    después inmediatamente pasa a mi archivo de validacion pero ya en el middleware (errorHandler), lo que hace es pasar por validationResult(req) 
    que lo unico que hace es abrir el registro dentro de req para ver si hay errores, si hay errores corta el proceso y lanza el error, 
    si esta vacia usamos el next y seguimos con nuestro proceso hacia el controlador.

*/



import { body } from 'express-validator';

export const validarSuperheroe = [
    // Validación de nombreSuperheroe
    body('nombreSuperHeroe')
        .trim()
        .notEmpty().withMessage('El nombre del superheroe es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre debe tener entre 3 y 60 caracteres'),

    // Validación de nombreReal
    body('nombreReal')
        .trim()
        .notEmpty().withMessage('El nombre real es obligatorio')
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),

    // Validación de edad
    body('edad')
        .trim()
        .notEmpty().withMessage('La edad es obligatoria')
        .isNumeric().withMessage('La edad debe ser un número')
        .isInt({ min: 0 }).withMessage('La edad no puede ser un número negativo'),

    // Validación de poderes (Array de strings)
    body('poderes')
        .customSanitizer(value => {
            // Si es un string, lo convertimos en array. Si ya es array, lo devolvemos.
            if (typeof value === 'string') {
                return value.split(',').map(p => p.trim()).filter(p => p.length > 0);
            }
            return Array.isArray(value) ? value : [];
        })
        .isArray({ min: 1 }).withMessage('Poderes debe tener al menos un elemento')
        .custom((value) => {
            // Validamos que cada elemento tenga al menos 3 caracteres
            if (!value.every(poder => typeof poder === 'string' && poder.trim().length >= 3)) {
                throw new Error('Cada poder debe tener al menos 3 caracteres');
            }
            return true;
        })
];