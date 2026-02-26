
# 👾 RESUMEN CON UNA FRASE CADA UNO:

path → solo trabaja con texto, no crea nada

fs → crea y modifica archivos de verdad, pero asincrónico

http → arma un servidor web que queda esperando conexiones

os → muestra datos de tu PC, no los cambia

events → muchas funciones reaccionan a un solo aviso



# 📁 path (Rutas de archivos)

En tu práctica: Escribiste un código que mostraba en consola cosas como "Directorio base: ./data"
y "Extensión: .txt". Después buscaste en tu PC y no apareció ninguna carpeta 'data' ni ningún
archivo. Te confundiste porque pensaste que se iba a crear algo.

Qué hace realmente: Solo manipula texto. Toma strings como './data/example.txt' y los corta, los 
une, les saca partes. Pero nunca toca el disco duro. Es como tener un mapa: podés señalar un 
lugar con el dedo, pero eso no construye una casa ahí.

Para recordar: path = texto, no crea nada



# 📁 fs (File System - Archivos reales)

En tu práctica: Ejecutaste y te apareció un error "ENOENT". Después entendiste que era porque no 
existía la carpeta 'data'. Cuando la creaste manualmente, funcionó. Además viste que los mensajes
 aparecieron desordenados: primero "Archivo renombrado", después "Archivo creado", aunque en el 
 código estaban al revés.

Qué hace realmente: Este SÍ interactúa con el disco duro. Lee archivos que existen, crea archivos
nuevos, los renombra, los borra. Pero todo lo hace de manera asincrónica: las operaciones se
lanzan y cada una termina cuando puede, no en el orden que las escribiste.

Para recordar: fs = archivos reales, asincrónico, necesita que las carpetas existan



# 📁 http (Servidores web)

En tu práctica: Corriste el código y la terminal se quedó "colgada", no volvía a aparecer el prompt.
Después abriste el navegador en http://127.0.0.1:3000/ y viste "¡Hola Mundo!". 
Para volver a escribir comandos tuviste que apretar Ctrl+C.

Qué hace realmente: Creó un servidor web que se queda ejecutándose para siempre. Cada vez que alguien 
entra a esa dirección, ejecuta el código que le pusiste. No termina solo porque está esperando nuevas 
conexiones.

Para recordar: http = servidor, queda corriendo, responde peticiones



# 📁 os (Sistema Operativo)

En tu práctica: Al ejecutarlo, en la consola apareció un montón de información: arquitectura de tu PC, 
tipo de Windows, cuánta memoria RAM tenés, cuánta está libre, y datos detallados del procesador.

Qué hace realmente: Le pregunta al sistema operativo datos sobre el hardware y el sistema. Todo eso lo 
muestra, pero no cambia nada. Es como mirar el panel de control de tu PC pero desde código.

Para recordar: os = muestra info del sistema, no modifica nada



# 📁 events (Sistema de eventos)

En tu práctica: Primero hiciste un ejemplo simple con un solo console.log y te pareció raro porque con 
una función común era más fácil. Después hiciste el ejemplo donde un solo emisor.emit('saludo', 'Maty') 
disparó tres mensajes diferentes: el hola, el cómo estás y la hora.

Qué hace realmente: Crea un sistema donde podés registrar muchas funciones para que esperen un mismo 
"aviso". Cuando ese aviso ocurre, todas se ejecutan automáticamente. Las funciones no se llaman entre 
sí, solo están "escuchando" el mismo evento.

Para recordar: events = un disparador, muchas funciones reaccionan