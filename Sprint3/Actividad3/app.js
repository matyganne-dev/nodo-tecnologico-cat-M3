
import express from 'express';
import { setServers } from 'node:dns/promises';
import { connecBD } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3005;


//(ETAPA 2) -> configuracion EJS
//Se establece el motor de plantillas ejs
app.set('view engine', 'ejs');
// Esta línea sirve para encontrar la carpeta correctamente
app.set('views', './src/views');

// Middleware para parsear JSON
app.use(express.json());

//(ETAPA 3) -> Middleware para parsear datos de formularios (Vistas EJS)
//recibe el texto y lo convierte a un objeto javascript
app.use(express.urlencoded({ extended: true }));

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