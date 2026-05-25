class IRepository {
    obtenerPorId(id) {
        throw new Error("Método 'obtenerPorId()' no implementado");
    }

    obtenerTodos() {
        throw new Error("Método 'obtenerTodos()' no implementado");
    }

    crear(datos) {
        throw new Error("Método 'crear()' no implementado");
    }

    actualizar(id, datos) {
        throw new Error("Método 'actualizar()' no implementado");
    }

    borrarPorId(id) {
        throw new Error("Método 'borrarPorId()' no implementado");
    }
}

export default IRepository;