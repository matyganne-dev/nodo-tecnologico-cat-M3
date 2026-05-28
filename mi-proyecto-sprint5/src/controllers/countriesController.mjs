import { 
    obtenerYPersistirPaisesEstablecidos,
    restaurarPaisesPorCreador,
    obtenerPaisPorId,
    crearNuevoPais,
    actualizarPaisExistente,
    eliminarPais
} from '../services/countriesService.mjs';

export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerYPersistirPaisesEstablecidos();
        return res.render('dashboard', { title: 'Dashboard - Gestión de Países', paises });
    } catch (error) {
        console.error("Error en obtenerTodosLosPaisesController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error al obtener los países' });
    }
}

export function agregarPaisFormController(req, res) {
    return res.render('addCountry', { title: 'Agregar Nuevo País' });
}

export async function crearPaisController(req, res) {
    try {
        await crearNuevoPais(req.body);
        return res.status(201).json({ status: 'success', mensaje: 'País creado con éxito' });
    } catch (error) {
        console.error("Error en crearPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al crear el país' });
    }
}

export async function editarPaisFormController(req, res) {
    try {
        const { id } = req.params;
        const pais = await obtenerPaisPorId(id);

        if (!pais) {
            return res.status(404).send('El país no existe');
        }

        return res.render('editCountry', { title: 'Editar País', pais });
    } catch (error) {
        console.error("Error en editarPaisFormController:", error);
        return res.status(500).send('Error interno del servidor');
    }
}

export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        await actualizarPaisExistente(id, req.body);
        
        return res.status(200).json({ status: 'success', mensaje: 'País actualizado con éxito' });
    } catch (error) {
        console.error("Error en actualizarPaisController:", error);
        
        if (error.statusCode === 404) {
            return res.status(404).json({ status: 'error', mensaje: error.message });
        }
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al actualizar el país' });
    }
}

export async function borrarPaisController(req, res) {
    try {
        const { id } = req.params;
        await eliminarPais(id);

        return res.status(200).json({ status: 'success', mensaje: 'País eliminado con éxito' });
    } catch (error) {
        console.error("Error en borrarPaisController:", error);
        
        if (error.statusCode === 404) {
            return res.status(404).json({ status: 'error', mensaje: error.message });
        }
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al eliminar el país' });
    }
}

export async function restaurarPaisesController(req, res) {
    try {
        await restaurarPaisesPorCreador();
        return res.status(200).json({ status: 'success', mensaje: 'Datos limpiados y recargados con éxito' });
    } catch (error) {
        console.error("Error en restaurarPaisesController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error al reiniciar los datos' });
    }
}