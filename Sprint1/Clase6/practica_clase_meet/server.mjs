import express from 'express';
// Importamos los controladores (revisa que los nombres coincidan con tareaController.mjs)
import {
    listarTareasController,
    obtenerTareaController,
    crearTareasController,
    actualizarTareaController,
    eliminarTareaController,
    listarCompletadasController
} from './controllers/tareaController.mjs';

const app = express();
const PORT = 3001;

// Middleware para entender archivos JSON
app.use(express.json());

// --- RUTAS ---

// 1. Listar todas
app.get("/tareas", listarTareasController);

// 2. Listar completadas (VA ARRIBA DE :id)
app.get("/tareas/completadas", listarCompletadasController);

// 3. Obtener una por ID
app.get("/tareas/:id", obtenerTareaController);

// 4. Crear tarea
app.post("/tareas", crearTareasController);

// 5. Actualizar tarea
app.put("/tareas/:id", actualizarTareaController);

// 6. Eliminar tarea (Corregido el :id)
app.delete("/tareas/:id", eliminarTareaController);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});