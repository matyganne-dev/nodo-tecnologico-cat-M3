import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await SuperHero.find({ [atributo]: valor });
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 }, // Busca en edad, mayores a 30. $gt (mayor que)
            planetaOrigen: 'Tierra', // Coincidencia exacta
            $expr: { $gte: [{ $size: "$poderes" }, 2] } //$expr permite usar expresiones de agregación, $size: "$poderes"  cuenta los elementos de un array, $gte: [..., 2], verifica que el tamaño sea mayor o igual
        });
    }


    //POST
    //creacion de nuevo superheroe
    async crear(datos) {
        return await SuperHero.create(datos);
    }

    //PUT
    //Actualizar un superheroe por su ID
    async actualizar(id, datos) {
        return await SuperHero.findByIdAndUpdate(id, datos, { new: true });
    }

    //DELETE
    // Borrar un superheroe por ID 
    async borrarPorId(id) {
        return await SuperHero.findByIdAndDelete(id);
    }

    // Borrar un superheroe por su nombre 
    async borrarPorNombre(nombre) {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }

}

export default new SuperHeroRepository();