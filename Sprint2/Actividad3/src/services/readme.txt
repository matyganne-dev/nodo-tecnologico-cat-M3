Logica del negocio

Este archivo importa la instancia del repositorio que creamos antes. Después crea métodos que llaman a los métodos del repositorio. 
Básicamente es un intermediario: recibe los datos, los pasa al repositorio, y el repositorio va a buscar a MongoDB.

Por ahora los métodos solo pasan los datos de un lado al otro, pero acá es donde después voy a poner las validaciones y transformaciones. 
Por ejemplo, si alguien busca por edad y manda "31script", yo en el servicio lo valido: convierto a número, si da NaN tiro error y no llega 
a la base de datos. También puedo transformar los datos que vienen de MongoDB, como agregar una etiqueta "Humano", "Alien" o "Dios" según la 
edad del héroe. Así el repositorio queda limpio solo para hacer consultas a la base de datos y el servicio se encarga de la lógica.




Servicio en MVC - Descripción General
¿Qué es?
Es la capa que contiene la lógica de negocio. Actúa como intermediario entre el controlador y el repositorio.

¿Qué hace?

Recibe los datos del controlador

Valida que los datos sean correctos (tipos, formatos, etc.)

Sanitiza la información para evitar inyecciones o datos maliciosos

Transforma los datos según lo que se necesite (agregar campos, calcular valores, formatear)

Llama al repositorio para buscar o guardar en la base de datos

Devuelve la información ya procesada al controlador

¿Por qué se usa?

Separa la lógica de negocio del acceso a datos

El repositorio solo se preocupa por la base de datos

El servicio se preocupa por qué hacer con esos datos

Si cambian las reglas de negocio, solo toco el servicio, no el repositorio

En pocas palabras:
El servicio es el que piensa y decide. El repositorio solo obedece y va a buscar datos. El controlador solo recibe peticiones y envía respuestas. Cada uno hace una sola cosa.