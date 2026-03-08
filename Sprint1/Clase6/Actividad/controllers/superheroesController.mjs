import { obtenerSuperheroePorId, buscarSuperHeroesPorAtributo, obtenerSuperheroesMayoresDe30 } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarSuperheroes } from '../view/responseView.mjs';

export function obtenerSuperheroePorIdController(req, res){
    const {id} = req.params;
    const superheroe = obtenerSuperheroePorId(parseInt(id));
    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send('Superhéroe no encontrado');
    }
}

export function buscarSuperheroesPorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = buscarSuperHeroesPorAtributo(atributo, valor);
    if(superheroes.length > 0){
        res.send(renderizarSuperheroes(superheroes));
    } else {
        res.status(404).send('No se encontraron superhéroes con ese atributo y valor');
    }
}

export function obtenerSuperheroesMayoresDe30Controller(req, res){
    const superheroes = obtenerSuperheroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));
}