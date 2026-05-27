import CountryRepository from '../repositories/CountryRepository.mjs';
// Importamos la función de transformación del servicio
import { fetchAndProcessCountries, mapearDatosFormulario } from '../services/countriesService.mjs';

// 1. GET: Listar todos los países (Dashboard)
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const apiCountries = await fetchAndProcessCountries();
        await CountryRepository.saveInitialCountries(apiCountries);
        const paises = await CountryRepository.obtenerTodos();
        
        return res.render('dashboard', { title: 'Dashboard - Gestión de Países', paises });
    } catch (error) {
        console.error("Error en obtenerTodosLosPaisesController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error al obtener y sincronizar los países' });
    }
}

// 2. GET: Renderizar formulario de Agregar
export function agregarPaisFormController(req, res) {
    return res.render('addCountry', { title: 'Agregar Nuevo País' });
}

// 3. POST: Crear un país manualmente
export async function crearPaisController(req, res) {
    try {
        // EL CONTROLADOR SOLO ES UN PUENTE: Delega la transformación al servicio
        const datosProcesados = mapearDatosFormulario(req.body);
        
        await CountryRepository.crear(datosProcesados);
        return res.status(201).json({ status: 'success', mensaje: 'País creado con éxito' });
    } catch (error) {
        console.error("Error en crearPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al crear el país' });
    }
}

// 4. GET: Renderizar formulario de Editar
export async function editarPaisFormController(req, res) {
    try {
        const { id } = req.params;
        const pais = await CountryRepository.obtenerPorId(id);

        if (!pais) {
            return res.status(404).send('El país no existe');
        }

        return res.render('editCountry', { title: 'Editar País', pais });
    } catch (error) {
        console.error("Error en editarPaisFormController:", error);
        return res.status(500).send('Error interno del servidor');
    }
}

// 5. PUT: Actualizar país 
export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        
        // EL CONTROLADOR SOLO ES UN PUENTE: Delega la transformación al servicio
        const datosActualizados = mapearDatosFormulario(req.body);

        const paisEditado = await CountryRepository.actualizar(id, datosActualizados);

        if (!paisEditado) {
            return res.status(404).json({ status: 'error', mensaje: 'El país no existe' });
        }

        return res.status(200).json({ status: 'success', mensaje: 'País actualizado con éxito' });
    } catch (error) {
        console.error("Error en actualizarPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al actualizar el país' });
    }
}

// 6. DELETE: Eliminar país
export async function borrarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisEliminado = await CountryRepository.borrarPorId(id);

        if (!paisEliminado) {
            return res.status(404).json({ status: 'error', mensaje: 'El país no existe' });
        }

        return res.status(200).json({ status: 'success', mensaje: 'País eliminado con éxito' });
    } catch (error) {
        console.error("Error en borrarPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al eliminar el país' });
    }
}