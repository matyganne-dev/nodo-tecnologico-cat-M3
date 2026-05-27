import axios from 'axios';

const MI_NOMBRE = "Pablo Matias Ganne Moreno"; 

function normalizeGini(giniObj) {
    if (!giniObj || typeof giniObj !== 'object') return null;
    const years = Object.keys(giniObj);
    if (years.length === 0) return null;
    const lastYear = years.sort().pop();
    return giniObj[lastYear];
}

export async function fetchAndProcessCountries() {
    try {
        const URL = 'https://restcountries.com/v3.1/region/america';
        const response = await axios.get(URL);
        const countries = response.data;

        const spanishCountries = countries.filter(country => country.languages && country.languages.spa);

        return spanishCountries.map(country => {
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
    } catch (error) {
        console.error('Error al procesar los datos de la API externa:', error.message);
        throw new Error('No se pudieron obtener o procesar los países de la API.');
    }
}

/*NUEVA FUNCIÓN: Transforma y normaliza los datos crudos del formulario antes de enviarlos al Repositorio para su creación o edición.*/
export function mapearDatosFormulario(datosFormulario) {
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
        // Si no vienen husos horarios, le ponemos el fallback por defecto
        timezones: timezones ? timezones.split(',').map(t => t.trim()) : ["UTC-03:00"],
        creador: MI_NOMBRE
    };
}