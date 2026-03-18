
//Cargar variables de entorno desde el archivo .env
import 'dotenv/config';

// Importamos la función setServers del módulo 'dns/promises' de Node.js
// Esta función nos permite cambiar los servidores DNS que usa Node.js
import { setServers } from 'node:dns/promises';

import mongoose from 'mongoose';

// Configuramos manualmente los servidores DNS que usará Node.js
// Esto es necesario porque en algunas versiones de Node.js (22+) en Windows,
// el resolvedor DNS interno falla al intentar resolver consultas SRV
// Usamos los servidores públicos de Cloudflare (1.1.1.1) y Google (8.8.8.8)
// que son confiables y universales
setServers(["1.1.1.1", "8.8.8.8"]);

//Leer la URI de conexión desde el archivo .env
const MONGODB_URI = 'mongodb+srv://grupo-06:grupo-06@cluster0.blryo.mongodb.net/NodeMod3Cohorte5';

//Verificar que la variable se cargó correctamente
if (!MONGODB_URI) {
    console.error('❌ ERROR: No se encontró MONGODB_URI en el archivo .env');
    process.exit(1); // Detiene la ejecución
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conexion exitosa a MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));



//esquema de los superheroes
const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creator: String
}, { collection: 'Grupo-06' });

const SuperHero = mongoose.model('SuperHero', superheroSchema);

//funcion para insertar nuevo heroe

async function insertSuperHero() {
    const hero = new SuperHero({
        nombreSuperHeroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 25,
        planetaOrigen: 'Tierra',
        debilidad: 'Radioactiva',
        poderes: ['Trepar paredes', 'Sentido aracnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Ironman'],
        enemigos: ['Duende Verde'],
        creador: 'Matias Ganne'
    });
    await hero.save();
    console.log('Superheroe insertado:', hero);
}

insertSuperHero();


//funcion para actualizar el heroe

async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
        { nombreSuperHeroe: nombreSuperHeroe },
        { $set: { edad: 26 } }
    );
    console.log('Resultado de la actualizacion', result);
}

updateSuperHero('Spiderman');

//Eliminar un heroe de la coleccion

async function deleteSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
    console.log('Superheroe eliminado', result);
}

deleteSuperHero('Spiderman');


//Funcion para buscar hereo por medio de alguna propiedad

async function findSuperHeroes() {
    const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
    console.log('Superheroes encontrados:', heroes);
}

findSuperHeroes();