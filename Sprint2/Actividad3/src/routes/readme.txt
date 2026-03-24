Rutas de la API

vamos a tener nuestro archivo superHeroRoutes.mjs osea las rutas API para superHeroRoutes

Este archivo define las rutas de la API. Importa los controladores que creamos antes y los asigna a cada endpoint.

Lo que hago acá es crear un enrutador de Express y definir qué controlador se ejecuta para cada URL:

GET /heroes → trae todos los superhéroes

GET /heroes/:id → trae un superhéroe por su ID (los dos puntos indican que es un parámetro variable)

GET /heroes/buscar/:atributo/:valor → busca por cualquier atributo, recibe dos parámetros: el campo y el valor

GET /heroes/mayores-30 → trae los héroes mayores de 30 años

Al final exporto el enrutador para después importarlo en el archivo principal de la aplicación (app.js) y montarlo.


Acá le digo al servidor "cuando llegue una petición a tal URL, ejecutá tal controlador". Es el mapa que conecta lo que pide el cliente con lo que hace el servidor.




Explicación genérica
Rutas en MVC - Descripción General

¿Qué es?
Es la capa que define los endpoints de la API. Mapea cada URL con su controlador correspondiente.

¿Qué hace?

Define las rutas que va a escuchar el servidor

Asigna cada ruta a un controlador específico

Agrupa rutas relacionadas en un mismo archivo

¿Por qué se usa?

Separa la definición de rutas de la lógica de los controladores

Facilita ver de un vistazo todos los endpoints disponibles

Permite organizar las rutas por módulos o recursos

Si cambia la URL de algún endpoint, solo se modifica acá

En pocas palabras:
Las rutas son el directorio telefónico. Le dicen al servidor "si te piden esto, andá a este controlador".