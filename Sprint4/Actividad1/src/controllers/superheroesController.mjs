import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    crearSuperheroe,
    actualizarSuperheroe,
    borrarSuperheroe
} from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';


export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        // Renderizamos la vista dashboard.ejs (Etapa 2)
        res.render('dashboard', { superheroes: superheroesFormateados });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function crearSuperheroeController(req, res) {
    try {
        // Los datos ya vienen validados y limpios del middleware
        await crearSuperheroe(req.body);
        // Redirigimos al dashboard para ver el nuevo héroe (Etapa 3)
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

export async function editarSuperheroeFormController(req, res) {
    try {
        const { id } = req.params;
        const heroe = await obtenerSuperheroePorId(id);
        if (!heroe) {
            return res.status(404).send('Superhéroe no encontrado');
        }
        // Enviamos el héroe a la vista de edición (Etapa 4)
        res.render('editSuperhero', { heroe });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
}

export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        await actualizarSuperheroe(id, req.body);
        // Redirigimos tras la actualización (Etapa 4)
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar', error: error.message });
    }
}

export async function borrarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        await borrarSuperheroe(id);
        // Redirigimos tras borrar (Etapa 5)
        res.redirect('/heroes');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al borrar', error: error.message });
    }
}