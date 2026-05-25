import CountryRepository from '../repositories/CountryRepository.mjs';
import { fetchAndProcessCountries } from '../services/countriesService.mjs';

// 1. GET: Listar todos los países (Dashboard)
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        // Traemos los datos limpios de la API externa
        const apiCountries = await fetchAndProcessCountries();
        
        // Sincronizamos en la base de datos usando la estrategia Upsert (Anti-duplicados)
        await CountryRepository.saveInitialCountries(apiCountries);
        
        // Buscamos los países almacenados para enviarlos a la vista
        const paises = await CountryRepository.obtenerTodos();
        
        return res.render('dashboard', { 
            title: 'Dashboard - Gestión de Países', 
            paises 
        });
    } catch (error) {
        console.error("Error en obtenerTodosLosPaisesController:", error);
        return res.status(500).json({ 
            status: 'error', 
            mensaje: 'Error al obtener y sincronizar los países', 
            error: error.message 
        });
    }
}

// 2. GET: Renderizar formulario de Agregar
export function agregarPaisFormController(req, res) {
    return res.render('addCountry', { title: 'Agregar Nuevo País' });
}

// 3. POST: Crear un país manualmente (Petición Fetch asíncrona)
export async function crearPaisController(req, res) {
    try {
        const { officialName, capital, area, population, gini, borders } = req.body;

        const nuevoPais = {
            name: { official: officialName },
            capital: capital ? capital.split(',').map(c => c.trim()) : [],
            borders: borders ? borders.split(',').map(b => b.trim().toUpperCase()) : [],
            area: Number(area),
            population: Number(population),
            gini: gini ? Number(gini) : null,
            timezones: ["UTC-03:00"],
            creador: "Pablo Matias Ganne Moreno"
        };

        await CountryRepository.crear(nuevoPais);
        return res.status(201).json({ status: 'success', mensaje: 'País creado con éxito' });
    } catch (error) {
        console.error("Error en crearPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error al crear el país en el servidor' });
    }
}

// 4. GET: Renderizar formulario de Editar precargado
export async function editarPaisFormController(req, res) {
    try {
        const { id } = req.params;
        const pais = await CountryRepository.obtenerPorId(id);
        
        if (!pais) {
            return res.status(404).send('País no encontrado');
        }
        
        return res.render('editCountry', { title: 'Editar País', pais });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno del servidor');
    }
}

// 5. PUT: Actualizar país (Petición Fetch asíncrona)
export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        const { officialName, capital, area, population, gini, borders } = req.body;

        const datosActualizados = {
            name: { official: officialName },
            capital: capital ? capital.split(',').map(c => c.trim()) : [],
            borders: borders ? borders.split(',').map(b => b.trim().toUpperCase()) : [],
            area: Number(area),
            population: Number(population),
            gini: gini ? Number(gini) : null,
            creador: "Pablo Matias Ganne Moreno"
        };

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

// 6. DELETE: Eliminar país (Petición Fetch asíncrona)
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
        return res.status(500).json({ status: 'error', mensaje: 'Error al intentar eliminar el país' });
    }
}