import os from 'os';

// Obtener la arquitectura del sismtema
console.log('Arquitectura:', os.arch());

// Obtener el tipo de sistema operativo
console.log('Plataforma:', os.platform());

// Obtener la cantidad total de memoria
console.log('Memoria Total:', os.totalmem());

// Obtener la memoria libre
console.log('Memoria Libre:', os.freemem());

// Obtener la informacion de la CPU
console.log('CPU:', os.cpus());

