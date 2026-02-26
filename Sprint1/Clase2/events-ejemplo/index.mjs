import { EventEmitter } from 'events';

// Crear una instancia de EventEmitter
const emisor = new EventEmitter();

// Definir un evento personalizado
emisor.on('saludo', (nombre) => {
    console.log(`¡Hola, ${nombre}!`);
});

// Emitir el evento 'saludo'
emisor.emit('saludo', 'Maty');


//ejemplo mio para entender:

// import { EventEmitter } from 'events';
// const emisor = new EventEmitter();

// Puedo tener MÚLTIPLES "reacciones" al mismo evento
// emisor.on('saludo', (nombre) => {
//     console.log(`¡Hola, ${nombre}!`);
// });

// emisor.on('saludo', (nombre) => {
//     console.log(`¿Cómo estás, ${nombre}?`);
// });

// emisor.on('saludo', (nombre) => {
//     console.log(`Son las ${new Date().getHours()}:${new Date().getMinutes()}`);
// });

// UNA sola línea dispara TODO
// emisor.emit('saludo', 'Maty');

// RESULTADO:
// ¡Hola, Maty!
// ¿Cómo estás, Maty?
// Son las 15:30