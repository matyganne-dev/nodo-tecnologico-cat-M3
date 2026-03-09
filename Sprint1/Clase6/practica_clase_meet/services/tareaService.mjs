import TareaRepository from '../repository/tareaRepository.mjs';
import Tarea from '../model/tarea.mjs'

const tareaRepo = new TareaRepository();

export function listarTareas() {
    return tareaRepo.obtenerTareas();
}

export function obtenerPorId(id) {
    return tareaRepo.obtenerPorId(id);
}

export function crearTarea(id, titulo, descripcion, completado = false) {
    const tareas = tareaRepo.obtenerTareas(); // Corregido: antes decía obtenerTodas
    const nuevaTarea = new Tarea(id, titulo, descripcion, completado);
    tareas.push(nuevaTarea);
    tareaRepo.guardar(tareas);
    return nuevaTarea;
}

export function actualizar(id, datosActualizados) {
    const tareas = tareaRepo.obtenerTareas(); // Corregido: antes decía obtenerTodas
    const indice = tareas.findIndex((tarea) => tarea.id === Number(id));
    if (indice === -1) return null;
    tareas[indice] = { ...tareas[indice], ...datosActualizados, id: Number(id) };
    tareaRepo.guardar(tareas);
    return tareas[indice];
}

export function eliminar(id) {
    return tareaRepo.eliminar(id);
}

// Corregido el nombre para que coincida con el controlador
export function listarCompletadas(){
    const tareas = tareaRepo.obtenerTareas(); // Corregido: antes decía obtenerTodas
    return tareas.filter(tarea => tarea.completado)
}