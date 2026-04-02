Esta es nuestra capa de percistencia

Explicacion paso a paso de los archivos:

IRepository----------------------------

Paso 1
Creamos una clase llamada IRepository. La "I" hace referencia a que es una interface (tambien podemos decir que es una convencion).
esta clase no hace nada por si sola, solo sirve como plantilla o contrato para que otras clases la hereden.
al tener una herencia de esta interfaz aseguramos que cualquier clase que la implemente cuente con estos metodos, de caso contrario
saldria un error por le throw alertando al programador de que debe de agregar el metodo.

Paso 2
Definimos metodos

obtenerPorId(id). Este metodo sirve para buscar por Id 

obtenerTodos(). Este metodo debe de traer todo los registros de la coleccion

buscarPorAtributo(atributo, valor). Este metodo recibe dos parametros, el atributo y el valor

obtenerMayoresDe30(). Este metodo trae los heroes mayores de 30

export default IRepository: Esto exporta la clase para que pueda ser importada en otros archivos, como en SuperHeroRepository.mjs.

Explicacion de throw:

El throw existe para que la interfaz no pueda ser usada directamente. Si alguien intenta usar un método 
de IRepository sin haberlo implementado en la clase hija, el programa va a explotar con un error. Esto 
fuerza a que cualquier repositorio que herede de IRepository tenga sí o sí todos los métodos definidos. 
Sin el throw, los métodos estarían vacíos y no pasaría nada si alguien se olvida de implementarlos, el 
programa seguiría corriendo pero sin hacer lo que debería.


¿Por qué el throw está ahí?

Cuando creo IRepository, pongo los métodos con throw new Error porque la interfaz es solo una plantilla. 
Ella no sabe cómo buscar en MongoDB, no sabe cómo traer los datos. Su único trabajo es decir "estos 
métodos tienen que existir".

Entonces si alguien hereda de IRepository pero se olvida de escribir algún método, el throw va a explotar 
y me va a avisar que falta implementarlo. Es como un recordatorio obligatorio.

En la práctica, cuando uso SuperHeroRepository que ya tiene todos los métodos con su lógica real, 
el throw nunca se ejecuta porque los métodos de la interfaz quedan reemplazados por los de la clase 
hija.








SuperHeroRepository.mjs------------------

hacemos la importaciones necesarias

    -Trae el modelo SuperHero para poder consultar MongoDB
    -Trae la interfaz IRepository para heredar sus métodos

Hereda de IRepository:

    Esto obliga a implementar los 4 métodos que definió la interfaz.

Método obtenerPorId(id)
Usa findById de Mongoose para buscar un superhéroe por su ID.

Método obtenerTodos()
Usa find({}) sin filtros para traer todos los superhéroes.

Método buscarPorAtributo(atributo, valor)
Usa propiedad computada [atributo] para buscar dinámicamente por cualquier campo.

Método obtenerMayoresDe30()
Usa el operador $gt (mayor que) para filtrar edades mayores a 30.

Exportación:
Exporta una instancia ya creada, no la clase. Así se usa directamente sin instanciar cada vez.

