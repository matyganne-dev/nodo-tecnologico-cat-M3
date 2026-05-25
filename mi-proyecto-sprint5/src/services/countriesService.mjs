import axios from 'axios';

// Reemplaza esto con tu nombre real como indica el enunciado
const MI_NOMBRE = "Pablo Matias Ganne Moreno"; 

/**
 * Normaliza el objeto Gini de la API para extraer solo el valor del último año disponible.
 * Ejemplo de entrada: { "2016": 31.9 } -> Retorna: 31.9
 */
function normalizeGini(giniObj) {
    if (!giniObj || typeof giniObj !== 'object') return null;
    
    const years = Object.keys(giniObj);
    if (years.length === 0) return null;
    
    // Ordenamos los años y tomamos el más reciente
    const lastYear = years.sort().pop();
    return giniObj[lastYear];
}

/**
 * Obtiene los países de América, los filtra por idioma español,
 * limpia sus propiedades y agrega los campos requeridos.
 */
export async function fetchAndProcessCountries() {
    try {
        const URL = 'https://restcountries.com/v3.1/region/america';
        const response = await axios.get(URL);
        const countries = response.data;

        // 1. Filtrar: conservar solo países con idioma español ("spa")
        const spanishCountries = countries.filter(country => {
            return country.languages && country.languages.spa;
        });

        // 2. Limpiar y estructurar según lo requerido para nuestra base de datos
        const processedCountries = spanishCountries.map(country => {
            // Fallback de nombres: si no existe name.spa.official, usamos name.official
            const officialName = country.name?.nativeName?.spa?.official || country.name?.official;

            return {
                name: {
                    official: officialName
                },
                // Validamos arrays vacíos antes de mapear o guardar (evitando null/undefined)
                capital: country.capital || [],
                borders: country.borders || [],
                area: country.area || 0,
                population: country.population || 0,
                // Aplicamos la normalización del Gini
                gini: normalizeGini(country.gini),
                timezones: country.timezones || [],
                // Agregamos la propiedad nueva
                creador: MI_NOMBRE
            };
        });

        return processedCountries;

    } catch (error) {
        console.error('Error al procesar los datos de la API externa:', error.message);
        throw new Error('No se pudieron obtener o procesar los países de la API.');
    }
}