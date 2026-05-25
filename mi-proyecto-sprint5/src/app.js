import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import morgan from 'morgan'; // Importamos morgan para ver las peticiones
import { setServers } from 'node:dns/promises';
import { connecBD } from './config/dbConfig.mjs'; 
import countryRoutes from './routes/countryRoutes.mjs'; 
import methodOverride from 'method-override';

setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware de registro (Morgan): Te muestra en consola cada ruta que se visita
app.use(morgan('dev')); 

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views')); 

app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// CONFIGURACIÓN DE ESTILOS ESTÁTICOS CORREGIDA
app.use(express.static(path.resolve('public'))); 

app.use(methodOverride('_method')); 

// Conexión inicial a la Base de Datos
connecBD();

app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio - Gestión de Países' });
});

app.use('/paises', countryRoutes);

app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    // Mensaje ultra claro en consola con el link listo para hacer clic
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
});