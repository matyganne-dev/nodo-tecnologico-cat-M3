import { setServers } from 'node:dns/promises';
setServers(["1.1.1.1", "8.8.8.8"]);

import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import morgan from 'morgan'; 
import { connecBD } from './config/dbConfig.mjs'; 
import countryRoutes from './routes/countryRoutes.mjs'; 
import methodOverride from 'method-override';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(morgan('dev')); 

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/views')); 

app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.resolve('public'))); 

app.use(methodOverride('_method')); 

connecBD();

app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio - Gestión de Países' });
});

app.use('/paises', countryRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 'error', mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});