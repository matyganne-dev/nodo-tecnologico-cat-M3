# Central de Países Hispanohablantes - Trabajo Práctico Final (Sprint 5)

## Descripción del Proyecto
Esta aplicación web es un sistema de gestión y análisis demográfico diseñado en **Node.js**, **Express** y **MongoDB**. El sistema consume datos demográficos y geográficos de una API externa, filtra y limpia la información de los países de América cuyo idioma oficial es el español, y los persiste en una base de datos para permitir operaciones CRUD completas a través de una interfaz de usuario moderna y fluida.

El proyecto está estructurado siguiendo una arquitectura de software limpia en capas (**MVC + Patrón Repositorio**).

---

## Características y Desafíos Avanzados Cumplidos

### 1. Consumo, Filtrado y Limpieza de API
- **Endpoint Utilizado:** `https://restcountries.com/v3.1/region/america`
- **Filtrado Estricto:** Se procesan únicamente los países que contienen la clave `"spa"` dentro de sus lenguajes oficiales.
- **Limpieza de Propiedades:** Se omiten por completo los datos irrelevantes del payload original (como `translations`, `tld`, `cca2`, etc.) para almacenar un esquema de datos limpio y consistente.
- **Inyección de Autoría:** Se añade a cada registro la propiedad requerida `"creador": "Pablo Matias Ganne Moreno"`.

### 2. Base de Datos y Persistencia Robusta (Mongoose)
- Implementación de un mecanismo de **Seed / Upsert** basado en el nombre oficial del país (`name.official`) para poblar la base de datos de manera automatizada evitando duplicados en reinicios del servidor.
- **Normalización del Coeficiente Gini:** Dado que la API externa entrega un objeto histórico de años, el servicio analiza dinámicamente y extrae de manera adaptativa el valor del último año disponible.

### 3. Interfaz Web de Usuario (Views con EJS)
- Diseño basado en componentes semánticos y reutilizables: **Layout base, Navbar y Footer institucional**.
- **Dashboard Interactivo:** Presentación de los registros en una tabla dinámica.
- **Fila de Totales (Nivel Avanzado):** Cálculos automáticos al pie de la tabla que computan la población total regional, el área total acumulada y el promedio exacto de Gini (excluyendo controladamente los países que no poseen el valor evaluado).

### 4. Funcionalidades del Filtro y Paginación (Desafío Avanzado Opcional)
- **Búsqueda en tiempo real:** Filtrado combinado por texto (nombre del país o capital) y mediante un slider dinámico de rango de población mínima.
- **Paginación en Cliente:** Segmentación fluida de las filas de la tabla en bloques de 25 registros para optimizar la ergonomía y la velocidad de carga de la interfaz.
- **Filtro de Autoría:** Opción de alternar la vista entre todos los registros de la base o únicamente "mis países".
- **Botón de Restauración:** Mecanismo seguro para limpiar la base de datos y volver a sincronizar de manera limpia los datos desde la API.

### 5. Validaciones de Seguridad (Frontend y Backend)
- **Capa del Modelo:** Esquema de Mongoose blindado con restricciones de tipos, requerimientos y longitudes máximas/mínimas.
- **Capa de Rutas (Backend):** Implementación de `express-validator` para asegurar que ningún dato inválido o incompleto sea guardado.
- **Sanitización Personalizada Anti-Inyección:** Middleware helper incorporado que intercepta los campos de texto y destruye cualquier etiqueta HTML (`<h1>`, `<script>`, etc.) o caracteres de control inyectados antes de procesar el formulario.
- **UI Ergonómica:** El formulario trabaja de forma asíncrona mediante `fetch`, atrapando errores detallados de validación y manteniendo intactos los datos ya escritos por el usuario en pantalla.

---

## Tecnologías y Dependencias Utilizadas
- **Runtime:** Node.js (Ecosistema ESM utilizando módulos nativos `.mjs`)
- **Backend Framework:** Express.js
- **Base de Datos:** MongoDB Atlas & Mongoose ORM
- **Motor de Plantillas:** EJS (Embedded JavaScript) + Express EJS Layouts
- **Cliente HTTP:** Axios (Consumo de API externa)
- **Validación:** Express-Validator
- **Herramientas de Soporte:** Morgan (Logger en consola) y Method-Override (Habilitación de verbos PUT/DELETE en formularios analógicos).

---

## Estructura del Código Fuente
La aplicación implementa una arquitectura desacoplada por responsabilidades de la siguiente manera:
```text
├── src/
│   ├── config/
│   │   └── dbConfig.mjs          # Configuración y conexión a MongoDB Atlas
│   ├── controllers/
│   │   └── countriesController.mjs # Interceptores de peticiones y renderizado de vistas
│   ├── models/
│   │   └── Country.mjs           # Esquema formal y reglas de negocio del modelo Mongoose
│   ├── middlewares/
│   │   └── errorHandler.mjs      # Capturador y mapeador de errores express-validator
│   ├── repositories/
│   │   ├── IRepository.mjs       # Interfaz abstracta para la capa de persistencia
│   │   └── CountryRepository.mjs # Operaciones atómicas de queries a la base de datos
│   ├── routes/
│   │   └── countryRoutes.mjs     # Enrutador semántico de las URL del CRUD
│   ├── services/
│   │   └── countriesService.mjs  # Lógica de negocio, consumo de API, mapeo y normalización
│   ├── validators/
│   │   └── countryValidator.mjs  # Reglas estrictas de validación y sanitización HTML
│   └── views/
│       ├── partials/
│       │   ├── navbar.ejs        # Componente de navegación global
│       │   └── footer.ejs        # Footer institucional con datos del autor
│       ├── layout.ejs            # Contenedor y esqueleto maestro de las vistas
│       ├── index.ejs             # Landing page / Inicio de la aplicación
│       ├── about.ejs             # Vista institucional del Desarrollador
│       ├── dashboard.ejs         # Consola de administración, listado, filtros y totales
│       ├── addCountry.ejs        # Formulario de alta de nuevo país
│       └── editCountry.ejs       # Formulario de edición reactivo de registros
├── public/
│   └── css/
│       └── style.css             # Estilos de diseño visual de la interfaz de usuario
├── app.js                        # Punto de entrada inicial y configuración del servidor
└── package.json                  # Definición de scripts y dependencias del proyecto





Instrucciones de Instalación y Ejecución Local

1. Clonar el repositorio

git clone [https://github.com/matyganne-dev/nodo-tecnologico-cat-M3.git](https://github.com/matyganne-dev/nodo-tecnologico-cat-M3.git)
cd mi-proyecto-sprint5

2. Instalar dependencias del sistema

npm install


3. Configuración de Base de Datos

El string de conexión hacia la base de datos de MongoDB Atlas se encuentra centralizado en el archivo src/config/dbConfig.mjs.
Para conectar a una base de datos propia, edita el parámetro de conexión en dicho archivo:
await mongoose.connect('TU_CADENA_DE_CONEXION_A_MONGO_DB');

4. Inicializar el servidor

npm start
Alternativamente, si tienes configurado el punto de entrada directo:
node app.js

Cuando veas el mensaje Conexion exitosa a MongoDB y Servidor corriendo en: http://localhost:3005 en tu terminal, abre tu navegador web preferido e ingresa a:
http://localhost:3005


👤 Información del Autor

Nombre del Alumno: Pablo Matias Ganne Moreno
Proyecto: Trabajo Práctico Final - Sprint 5
Ubicación: Catamarca, Argentina
Contacto / Portfolio: https://portfoliogmpm.netlify.app