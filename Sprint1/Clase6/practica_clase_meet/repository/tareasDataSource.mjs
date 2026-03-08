
//FUENTE DE DATOS (DATA SOURCE)

// Este archivo se encarga de Leer y escribir en el archivo JSON que simula la base de datos

// la capa mas baja de la aplicacion, la que se encarga de manejar los datos, sin importar 
// como se usen esos datos en el resto de la aplicacion

//Usa operaciones SINCRONAS para simplificar el ejemplo, aunque en una aplicacion real se recomienda 
// usar operaciones ASINCRONAS para evitar bloquear el hilo de ejecucion

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// esto hace que el codigo funcione tanto en Windows como en Linux, ya que obtiene la ruta del 
// archivo actual de manera dinamica, sin importar el sistema operativo.
const archivoActual = fileURLToPath(import.meta.url); // ruta del archivo actual en formato URL, se convierte a ruta de archivo con fileURLToPath ejemplo: "file:///C:/proyectos/mi-app/src/tareasDataSource.mjs" se convierte a "C:/proyectos/mi-app/src/tareasDataSource.mjs"
const carpetaActual = path.dirname(archivoActual); // carpeta del archivo actual en formato de ruta de archivo, se obtiene con path.dirname, que devuelve la parte de la ruta sin el nombre del archivo ejemplo: "C:/proyectos/mi-app/src" en lugar de "C:/proyectos/mi-app/src/tareasDataSource.mjs"
const rutaAlArchivo = path.join(carpetaActual, "..", "tareas.txt") // ruta al archivo txt que simula la base de datos ejemplo: "C:/proyectos/mi-app/tareas.txt" se obtiene con path.join, que une las partes de la ruta de manera correcta para el sistema operativo, en este caso se sube un nivel con ".." para salir de la carpeta src y luego se agrega el nombre del archivo "tareas.txt"


// Leer todas las tareas del archivo (devuelve un array de objetos)
export function leerTareas() {
    try {
        const contenido = fs.readFileSync(rutaAlArchivo, 'utf-8'); // lee el contenido del archivo
        const textoLimpio = contenido.trim(); // elimina espacios en blanco al inicio y al final
        if (textoLimpio === "") return []; // si el archivo esta vacio, devuelve un array vacio
        return JSON.parse(textoLimpio); // convierte el texto a un array de objetos y lo devuelve
    } catch (error) {
        if (error.code === 'ENOENT') return []; // si el archivo no existe, devuelve un array vacio
        throw error; // si ocurre otro error, lo lanza para que se maneje en otro lugar
    }
}