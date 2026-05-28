import Country from '../models/Country.mjs';
import IRepository from './IRepository.mjs';

class CountryRepository extends IRepository {

    async borrarPorCreador(creadorNombre) {
        return await Country.deleteMany({ creador: creadorNombre });
    }

    // Obtener todos los países de la base de datos
    async obtenerTodos() {
        return await Country.find({});
    }

    // Obtener un país específico por su ID único de MongoDB
    async obtenerPorId(id) {
        return await Country.findById(id);
    }

    // Crear manualmente un nuevo país (Formulario de Agregar)
    async crear(datos) {
        return await Country.create(datos);
    }

    // Actualizar un país existente por su ID (Formulario de Edición)
    async actualizar(id, datos) {
        return await Country.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
    }

    // Eliminar un país de la base de datos
    async borrarPorId(id) {
        return await Country.findByIdAndDelete(id);
    }

    /*Guarda la lista de países procesados desde la API externa. Utiliza un 'upsert' basado en el nombre oficial para evitar duplicar datos.*/
    async saveInitialCountries(countriesList) {
        const savedDocs = [];
        for (const countryData of countriesList) {
            const updatedDoc = await Country.findOneAndUpdate(
                { "name.official": countryData.name.official }, // Criterio de búsqueda
                countryData,                                  // Datos a insertar/actualizar
                { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
            );
            savedDocs.push(updatedDoc);
        }
        return savedDocs;
    }
}

export default new CountryRepository();