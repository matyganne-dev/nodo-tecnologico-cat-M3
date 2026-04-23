import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30,
    crearSuperheroe,
    actualizarSuperheroe,
    borrarSuperheroe,
    borrarSuperheroePorNombre
} from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

//modificacion para  renderizar el dashboard
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        // Renderizamos la vista 'dashboard' enviando el array de héroes
        res.render('dashboard', { superheroes: superheroesFormateados });
    } catch (error) {
        // En caso de error, enviamos un 500
        res.status(500).send({ mensaje: 'Error al renderizar el dashboard', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

//POST
// ETAPA 3: Crear superhéroe y Redirigir
export async function crearSuperheroeController(req, res) {
    try {
        // Los datos vienen del formulario gracias a urlencoded
        await crearSuperheroe(req.body);
        
        // Redirigimos a la lista principal tras el éxito. (Tras agregarlo, redirige de vuelta al dashboard)
        res.redirect('/heroes'); 
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

// GET: Mostrar formulario de edición con datos precargados
export async function editarSuperheroeFormController(req, res) {
    try {
        // Captura el parámetro :id de la ruta 
        const { id } = req.params; 
        // Llama al servicio 
        const superheroe = await obtenerSuperheroePorId(id); 
        
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        // Renderizamos la vista de edición pasando el objeto del héroe
        res.render('editSuperhero', { heroe: superheroe });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario de edición', error: error.message });
    }
}


//PUT
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        // El service se encarga de actualizar en la DB
        await actualizarSuperheroe(id, req.body);
        
        // Redirigimos al dashboard para ver los cambios (Etapa 4)
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el superhéroe', error: error.message });
    }
}

//DELETE
export async function borrarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const superheroeBorrado = await borrarSuperheroe(id);
        
        if (!superheroeBorrado) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado para borrar' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeBorrado);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superheroe', error: error.message });
    }
}

export async function borrarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const superheroeBorrado = await borrarSuperheroePorNombre(nombre);
        
        if (!superheroeBorrado) {
            return res.status(404).send({ mensaje: 'Superheroe no encontrado para borrar por nombre' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroeBorrado);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar el superheroe por nombre', error: error.message });
    }
}