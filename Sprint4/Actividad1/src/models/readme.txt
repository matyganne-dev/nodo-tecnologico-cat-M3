Modelos de datos 

PASOS de que hace el archivo de SuperHero.mjs

PASO 1
Importamos Mongoose, que es la herramienta que nos permite conectar Node.js con MongoDB y definir cómo van a 
ser nuestros datos.


PASO 2
Creamos un "molde" o estructura que se llama superheroSchema. Es como un formulario que todos los superhéroes 
deben seguir cuando los guardemos en la base de datos. Dentro de este molde definimos cada campo:

nombreSuperHeroe: Es el nombre del héroe como "Superman" o "Spider-Man". Es obligatorio (required: true) porque 
sin nombre no tendría sentido.

edad: Es un número, pero ponemos un mínimo de 0 para que nadie ponga edades negativas (un héroe no puede tener -5 años).

planetaOrigen: Si no especificamos de dónde viene, por defecto será "Desconocido". Así evitamos campos vacíos.

poderes: Es un arreglo (lista) de textos, para poder poner varios poderes como "volar", "fuerza", etc.

createdAt: Es la fecha y hora exacta en que se creó el registro. Si no la ponemos, automáticamente se guarda la fecha actual.

de ahi los demas campos son auto explicativos ya que con esto damos un pantallazo de distintos campos utilizados.


PASO 3
luego creamos una constante "superHero" la cual convierte el molde en un modelo que mongoose puede usar.
const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-06');

mongoose.model() : Es un metodo de Mongoose que crea un modelo (Es como una "clase" que me permite interactuar con una coleccion)

Luego tenemos 3 parametros 'SuperHero', superheroSchema y 'Grupo-06'

'SuperHero': nombre del modelo. define como se llamara la coleccion en Mongodb, referencia a otras partes del codigo, normalmente 
se usa en singular con mayuscula inicial.

superheroSchema: esquema de nuestro modelo. es la estructura de nuestro documento. que campos tiene cada superheroe, que tipos de 
datos, validaciones, valores por defecto, etc.

'Grupo-06': Este es el nombre explicito de la conleccion en MongoDB. sin este paremetro , mongoose buscaria automaticame una 
coleccion llamada superheroes (plurizando el nombre del modelo 'SuperHero') en minuscula.
al especificar 'Grupo-06', le estoy diciendo: "usa exactamente esta coleccion en la base de datos".


Le decimos que se va a llamar como nuestra constante, que utilice el esquema que establecimos y que guarde los 
documentos en una colleccion llamada en este caso "Grupo-xx" que representa mi grupo, en esta caso "Grupo-06"



PASO 4
Exportamos el modelo para poder usarlo en otros archivos, por ejemplo cuando queramos buscar, guardar o modificar 
superhéroes desde nuestro servidor.





AHORA para estudiar y repasar:

Models en MVC - Descripción General
¿Qué son?
Son la capa que maneja los datos. Representan cómo se guarda y recupera la información en la base de datos.

¿Qué hacen?

Definen la estructura de los datos (qué campos tiene cada registro)

Establecen reglas (qué es obligatorio, qué tipo de datos, valores por defecto)

Se comunican con MongoDB para buscar, guardar, actualizar o eliminar información

¿Por qué se usan?

Organizan el código separando la lógica de datos del resto de la aplicación

Evitan que la información se guarde de forma desordenada o incompleta

Centralizan todo lo relacionado con la base de datos en un solo lugar

En pocas palabras:
El Modelo es el encargado de decir "así se ve un registro" y "así se trabaja con ellos". Es el puente entre la aplicación y MongoDB.
