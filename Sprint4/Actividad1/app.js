
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { setServers } from 'node:dns/promises';
import { connecBD } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3005;


//(ETAPA 2) -> configuracion EJS
//Se establece el motor de plantillas ejs
app.set('view engine', 'ejs');
// Esta línea sirve para encontrar la carpeta correctamente
app.set('views', path.resolve('src/views'));// Usa path.resolve para evitar errores de ruta

// Middleware para parsear JSON
app.use(express.json());

// Activar los layouts
app.use(expressLayouts);

// Indicar que el archivo base es layout.ejs (que debe estar en src/views/layout.ejs)
app.set('layout', 'layout');

// Servir archivos estáticos (para CSS e imágenes)
app.use(express.static('public'));

//(ETAPA 3) -> Middleware para parsear datos de formularios (Vistas EJS)
//recibe el texto y lo convierte a un objeto javascript
app.use(express.urlencoded({ extended: true }));

//Los formularios HTML nativos solo soportan GET y POST. Para usar un PUT real desde el navegador, tenemos que instalar un middleware llamado method-override
//Esto tengo que ver de limpiar porque al validar desde el front con el fetch creo que podria sacar esto. (preguntar a profes o chat) 
app.use(methodOverride('_method'));

// Conexión a MongoDB
connecBD();

// Configuración de rutas modificado
// Antes: app.use('/api', superHeroRoutes);
// Ahora: Según el enunciado (Etapa 2 y 3)
app.use('/heroes', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});