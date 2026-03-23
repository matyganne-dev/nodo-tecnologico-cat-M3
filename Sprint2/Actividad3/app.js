
import express from 'express';
import { setServers } from 'node:dns/promises';
import { connecBD } from './src/config/dbConfig.mjs'; 
setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const PORT = 3000;


connecBD();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});