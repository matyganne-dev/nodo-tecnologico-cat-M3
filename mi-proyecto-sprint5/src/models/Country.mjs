import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    name: {
        official: { 
            type: String, 
            required: true,
            minlength: 3,
            maxlength: 90
        }
    },
    capital: {
        type: [String], // Almacena un array de strings (ej: ["Buenos Aires"])
        required: true
    },
    borders: {
        type: [String], // Array de códigos de 3 letras (ej: ["ARG", "BRA"])
        default: []
    },
    area: {
        type: Number,
        required: true,
        min: 0
    },
    population: {
        type: Number,
        required: true,
        min: 0
    },
    gini: {
        type: Number, // Guardaremos el valor numérico normalizado
        min: 0,
        max: 100,
        default: null
    },
    timezones: {
        type: [String],
        default: []
    },
    creador: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Definimos el modelo apuntando a la colección correspondiente
const Country = mongoose.model('Country', countrySchema, 'Grupo-06');
export default Country;