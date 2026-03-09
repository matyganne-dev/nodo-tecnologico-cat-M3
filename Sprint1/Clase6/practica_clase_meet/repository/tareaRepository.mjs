

// Repositorio de tareas, encargado de la persistencia de datos, es decir, de guardar y recuperar las tareas desde 
// un archivo de texto (tareas.txt) que simula una base de datos.


// El repositorio es la capa de acceso a datos, la que se encarga de manejar la fuente de datos 
// (en este caso, el archivo de texto), sin importar como se usen esos datos en el resto de la 
// aplicacion. El repositorio se comunica con el servicio para recibir las solicitudes de datos 
// y devolver los resultados, pero no tiene conocimiento de como se usan esos datos en el servicio 
// o en el controlador.


// Funciones del repositorio, que se encargan de manejar las tareas, utilizando la fuente de datos 
// para leer y escribir las tareas en el archivo de texto.
import { leerTareas, escribirTareas } from "./tareasDataSource.mjs";

export default class TareaRepository {
    // Obtener todas las tareas del archivo, esto devuelve un array de objetos con las tareas
    obtenerTareas() {
        return leerTareas(); // llama a la funcion leerTareas del data source para obtener las tareas del archivo
    }

    // Obtener una tarea por su id
    obtenerPorId(id) {
        const tareas = leerTareas(); // obtiene todas las tareas del archivo
        const tarea = tareas.find((tarea) => tarea.id === Number(id)); // busca la tarea con el id especificado en el array de tareas
        return tarea || null; // devuelve la tarea encontrada, o null si no encuentra tarea con ese id)
    }

    // Guardar todas las tareas en el archivo (reemplaza todo el contenido)
    guardar(tareas) {
        escribirTareas(tareas);
    }

    // Eliminar una tarea por su ID
    eliminar(id) {
        const tareas = leerTareas();
        const indice = tareas.findIndex((tarea) => tarea.id === Number(id));
        if (indice === -1) return false;
        tareas.splice(indice, 1);
        escribirTareas(tareas);
        return true;
    }

}





