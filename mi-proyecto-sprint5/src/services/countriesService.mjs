import axios from 'axios';
import CountryRepository from '../repositories/CountryRepository.mjs';

const MI_NOMBRE = "Pablo Matias Ganne Moreno";

function normalizeGini(giniObj) {
    if (!giniObj || typeof giniObj !== 'object') return null;
    const years = Object.keys(giniObj);
    if (years.length === 0) return null;
    const lastYear = years.sort().pop();
    return giniObj[lastYear];
}

function mapearDatosFormulario(datosFormulario) {
    const { officialName, capital, area, population, gini, borders, timezones } = datosFormulario;

    return {
        name: {
            official: officialName
        },
        capital: capital ? capital.split(',').map(c => c.trim()) : [],
        borders: borders ? borders.split(',').map(b => b.trim().toUpperCase()) : [],
        area: Number(area),
        population: Number(population),
        gini: gini ? Number(gini) : null,
        timezones: timezones ? timezones.split(',').map(t => t.trim()) : ["UTC-03:00"],
        creador: MI_NOMBRE
    };
}

export async function obtenerYPersistirPaisesEstablecidos() {
    // 1. Buscamos en la base de datos si ya existen países que tengan mi nombre como creador
    const misPaisesExistentes = await CountryRepository.obtenerTodos().then(paises =>
        paises.filter(p => p.creador === MI_NOMBRE)
    );

    // 2. Si ya tenés tus datos guardados, evitamos llamar a la API y devolvemos la base completa
    if (misPaisesExistentes && misPaisesExistentes.length > 0) {
        return await CountryRepository.obtenerTodos();
    }

    // 3. Si no hay registros con tu nombre, la API se ejecuta, te inyecta tu autoría y los guarda
    const URL = 'https://restcountries.com/v3.1/region/america';
    const response = await axios.get(URL);
    const countries = response.data;

    const spanishCountries = countries.filter(country => country.languages && country.languages.spa);

    const apiCountries = spanishCountries.map(country => {
        const officialName = country.name?.nativeName?.spa?.official || country.name?.official;
        return {
            name: { official: officialName },
            capital: country.capital || [],
            borders: country.borders || [],
            area: country.area || 0,
            population: country.population || 0,
            gini: normalizeGini(country.gini),
            timezones: country.timezones || [],
            creador: MI_NOMBRE
        };
    });

    await CountryRepository.saveInitialCountries(apiCountries);
    return await CountryRepository.obtenerTodos();
}

export async function restaurarPaisesPorCreador() {
    // 1. Eliminar de la base de datos todos los documentos creados por mi
    await CountryRepository.borrarPorCreador(MI_NOMBRE);

    // 2. Volver a ejecutar el flujo limpio: consulta API, guarda upsert y retorna la lista
    return await obtenerYPersistirPaisesEstablecidos();
}

export async function obtenerPaisPorId(id) {
    return await CountryRepository.obtenerPorId(id);
}

export async function crearNuevoPais(datosRaw) {
    const datosProcesados = mapearDatosFormulario(datosRaw);
    return await CountryRepository.crear(datosProcesados);
}

export async function actualizarPaisExistente(id, datosRaw) {
    const datosProcesados = mapearDatosFormulario(datosRaw);
    const paisActualizado = await CountryRepository.actualizar(id, datosProcesados);

    if (!paisActualizado) {
        const error = new Error('El país no existe');
        error.statusCode = 404;
        throw error;
    }
    return paisActualizado;
}

export async function eliminarPais(id) {
    const paisEliminado = await CountryRepository.borrarPorId(id);
    if (!paisEliminado) {
        const error = new Error('El país no existe');
        error.statusCode = 404;
        throw error;
    }
    return paisEliminado;
}