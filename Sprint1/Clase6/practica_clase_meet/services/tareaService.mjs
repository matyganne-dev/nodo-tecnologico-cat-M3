
// Logica del negocio 

// El servicio es el cerebro de la aplicacion, el que se encarga de procesar los datos, aplicar las 
// reglas de negocio, y coordinar las operaciones entre la capa de datos (repository) y la capa de 
// presentacion (controller)

import TareaRepository from '../repository/tareaRepository.mjs';
import Tarea from '../model/tarea.mjs'

// Instancia el repositorio para manejar las tareas
const tareaRepo = new TareaRepository();

// Servicio para obtener todas las tareas
export function listarTareas() {
    return tareaRepo.obtenerTareas();
}

// Servicio para obtener una tarea por id
export function obtenerPorId(id) {
    return tareaRepo.obtenerPorId(id);
}

// Servivio para crear una nueva tarea
export function crearTarea(id, titulo, descripcion, completado = false) {
    const tareas = tareaRepo.obtenerTodas();
    const nuevaTarea = new Tarea(id, titulo, descripcion, completado);
    tareas.push(nuevaTarea);
    tareaRepo.guardar(tareas);
    return nuevaTarea;
}

// Servicio para actualizar una tarea existente
export function actualizar(id, datosActualizados) {
    const tareas = tareaRepo.obtenerTodas();
    const indice = tareas.findIndex((tarea) => tarea.id === Number(id));
    if (indice === -1) return null;
    tareas[indice] = { ...tareas[indice], ...datosActualizados, id: Number(id) };
    tareaRepo.guardar(tareas);
    return tareas[indice];
}

// Servicio para eliminar una tarea
export function eliminar(id) {
    return tareaRepo.eliminar(id);
}

// servicio para obtener solo las tareas completadas

export function listarTareasCompletadas(){
    const tareas = tareaRepo.obtenerTodas();
    return tareas.filter(tarea => tarea.completado)
}