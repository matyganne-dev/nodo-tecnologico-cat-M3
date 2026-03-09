// El controlador recibe las peticiones HTTP del cliente
// le pide los datos al servicio y devuelve la respuesta en JSON

import * as tareaService from "../services/tareaService.mjs";

// GET obtener todas las tareas
export function listarTareasController(req, res) {
    try {
        const tareas = tareaService.listarTareas();
        return res.json(tareas);
    } catch (error) {
        return res.status(500).json({ error: "Error al leer las tareas" });
    }
}

// GET obtener solo las tareas completadas
export function listarCompletadasController(req, res) {
    try {
        const completadas = tareaService.listarCompletadas();
        return res.json(completadas);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener las tareas completadas" });
    }
}

// GET obtener una tarea por ID
export function obtenerTareaController(req, res) {
    try {
        const tarea = tareaService.obtenerPorId(req.params.id);
        if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
        return res.json(tarea);
    } catch (error) {
        return res.status(500).json({ error: "Error al obtener la tarea" });
    }
}

// POST crear una nueva tarea
export function crearTareasController(req, res) {
    try {
        const { id, titulo, descripcion, completado } = req.body;
        const nueva = tareaService.crearTarea(id, titulo, descripcion, completado);
        return res.status(201).json(nueva);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// PUT Actualizar una tarea
export function actualizarTareaController(req, res) {
    try {
        const actualizada = tareaService.actualizar(req.params.id, req.body);
        if (!actualizada) return res.status(404).json({ error: "Tarea no encontrada" });
        return res.json(actualizada);
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar la tarea" });
    }
}

// DELETE Eliminar una tarea
export function eliminarTareaController(req, res) {
    try {
        const eliminada = tareaService.eliminar(req.params.id);
        if (!eliminada) return res.status(404).json({ error: "Tarea no encontrada" });
        return res.json(eliminada);
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar la tarea" });
    }
}