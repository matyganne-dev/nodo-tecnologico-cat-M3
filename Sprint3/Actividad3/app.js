
import express from 'express';
import { setServers } from 'node:dns/promises';
import { connecBD } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3005;


//(ETAPA 2) -> configuracion EJS
app.set('view engine', 'ejs');
// Esta línea sirve para encontrar la carpeta correctamente
app.set('views', './src/views');

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
connecBD();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});