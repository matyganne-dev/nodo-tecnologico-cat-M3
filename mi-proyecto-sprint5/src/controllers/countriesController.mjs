import CountryRepository from '../repositories/CountryRepository.mjs';
import { fetchAndProcessCountries } from '../services/countriesService.mjs';

export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const apiCountries = await fetchAndProcessCountries();
        await CountryRepository.saveInitialCountries(apiCountries);
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

export function agregarPaisFormController(req, res) {
    return res.render('addCountry', { title: 'Agregar Nuevo País' });
}

export async function crearPaisController(req, res) {
    try {
        const { officialName, capital, area, population, gini, borders, timezones } = req.body;

        const nuevoPais = {
            name: { official: officialName },
            capital: capital ? capital.split(',').map(c => c.trim()) : [],
            borders: borders ? borders.split(',').map(b => b.trim().toUpperCase()) : [],
            area: Number(area),
            population: Number(population),
            gini: gini ? Number(gini) : null,
            timezones: timezones ? timezones.split(',').map(t => t.trim()) : ["UTC-03:00"],
            creador: "Pablo Matias Ganne Moreno"
        };

        const paisCreado = await CountryRepository.crear(nuevoPais);
        return res.status(201).json({ status: 'success', mensaje: 'País creado con éxito', data: paisCreado });
    } catch (error) {
        console.error("Error en crearPaisController:", error);
        return res.status(500).json({ status: 'error', mensaje: 'Error interno al crear el país' });
    }
}

export async function editarPaisFormController(req, res) {
    try {
        const { id } = req.params;
        const pais = await CountryRepository.obtenerPorId(id);

        if (!pais) {
            return res.status(404).send('El país solicitado no existe.');
        }

        return res.render('editCountry', { title: 'Editar País', pais });
    } catch (error) {
        console.error("Error en editarPaisFormController:", error);
        return res.status(500).send('Error interno al cargar el formulario de edición.');
    }
}

export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        const { officialName, capital, area, population, gini, borders, timezones } = req.body;

        const datosActualizados = {
            name: { official: officialName },
            capital: capital ? capital.split(',').map(c => c.trim()) : [],
            borders: borders ? borders.split(',').map(b => b.trim().toUpperCase()) : [],
            area: Number(area),
            population: Number(population),
            gini: gini ? Number(gini) : null,
            timezones: timezones ? timezones.split(',').map(t => t.trim()) : ["UTC-03:00"],
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