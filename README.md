# TP04 - API REST de Provincias

API REST desarrollada con Node.js, Express y PostgreSQL para gestionar provincias. Permite obtener, crear, modificar y eliminar provincias a través de diferentes endpoints HTTP.

---

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución de JavaScript
- **Express** — framework para crear el servidor web y los endpoints
- **pg** — librería para conectarse a PostgreSQL
- **dotenv** — para leer variables de entorno desde el archivo `.env`
- **cors** — para permitir requests desde otros dominios
- **nodemon** — reinicia el servidor automáticamente al guardar cambios

---

## Estructura del proyecto

```
TP04/
├── index.js                          → levanta el servidor web
├── .env                              → credenciales y configuración (no se sube a git)
├── .gitignore
└── src/
    ├── configs/
    │   └── db-config.js              → configuración de conexión a PostgreSQL
    ├── controllers/
    │   └── province-controller.js    → recibe los requests y devuelve las respuestas HTTP
    ├── entities/
    │   └── province.js               → estructura/molde de una Provincia
    ├── helpers/
    │   ├── validaciones-helper.js    → reglas de negocio (validaciones)
    │   └── log-helper.js             → registra errores en archivo y/o consola
    ├── repositories/
    │   └── province-repository.js    → consultas SQL a la base de datos
    └── services/
        └── province-service.js       → une las validaciones con el repository
```

### ¿Para qué sirve cada capa?

| Capa | Responsabilidad |
|---|---|
| **Controller** | Recibe el request HTTP, llama al service, devuelve la respuesta |
| **Service** | Aplica las reglas de negocio y validaciones antes de ir a la base |
| **Repository** | Ejecuta las consultas SQL, es el único que habla con PostgreSQL |
| **Entity** | Define la estructura de los datos (qué campos tiene una Provincia) |
| **Helpers** | Funciones reutilizables: validaciones y logging de errores |

---

## Instalación

1. Clonar el repositorio y entrar a la carpeta:
```bash
cd TP04
```

2. Instalar las dependencias:
```bash
npm install
```

3. Crear el archivo `.env` en la raíz del proyecto con el siguiente contenido:
```
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=nombre_de_tu_base
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# LogHelper
LOG_FILE_PATH=./logs/
LOG_FILE_NAME=errores.log
LOG_TO_FILE_ENABLED=true
LOG_TO_CONSOLE_ENABLED=true
```

4. Levantar el servidor:
```bash
npm run dev
```

El servidor queda corriendo en `http://localhost:3001`

---

## Endpoints

Base URL: `http://localhost:3001/api/province`

---

### GET /api/province
Devuelve todas las provincias.

**Request:**
```
GET http://localhost:3001/api/province
```

**Response exitoso — 200 OK:**
```json
[
    {
        "id": 1,
        "nombre": "Buenos Aires",
        "nombrecompleto": "Provincia de Buenos Aires",
        "latitud": -36.6769,
        "longitud": -60.5588,
        "displayorder": 1
    }
]
```

---

### GET /api/province/:id
Devuelve una provincia por su id.

**Request:**
```
GET http://localhost:3001/api/province/1
```

**Response exitoso — 200 OK:**
```json
{
    "id": 1,
    "nombre": "Buenos Aires",
    "nombrecompleto": "Provincia de Buenos Aires",
    "latitud": -36.6769,
    "longitud": -60.5588,
    "displayorder": 1
}
```

**Response si no existe — 404 Not Found:**
```
Provincia no encontrada.
```

---

### POST /api/province
Crea una nueva provincia.

**Request:**
```
POST http://localhost:3001/api/province
Content-Type: application/json
```

**Body:**
```json
{
    "name": "Chaco",
    "full_name": "Provincia del Chaco",
    "latitude": -24.895086,
    "longitude": -59.932189,
    "display_order": 100
}
```

**Response exitoso — 201 Created:**
```
Provincia creada correctamente.
```

**Response si hay error de validación — 400 Bad Request:**
```
El nombre de la provincia debe tener al menos 3 letras.
```

---

### PUT /api/province
Actualiza una provincia existente. El body debe incluir el `id` de la provincia a modificar.

**Request:**
```
PUT http://localhost:3001/api/province
Content-Type: application/json
```

**Body:**
```json
{
    "id": 34,
    "name": "Chaco Modificado",
    "full_name": "Provincia del Chaco Modificada",
    "latitude": -24.895086,
    "longitude": -59.932189,
    "display_order": 100
}
```

**Response exitoso — 200 OK:**
```
Provincia actualizada correctamente.
```

**Response si no existe — 404 Not Found:**
```
Provincia no encontrada.
```

**Response si hay error de validación — 400 Bad Request:**
```
El nombre de la provincia no puede estar vacío.
```

---

### DELETE /api/province/:id
Elimina una provincia por su id.

**Request:**
```
DELETE http://localhost:3001/api/province/34
```

**Response exitoso — 200 OK:**
```
Provincia eliminada correctamente.
```

**Response si no existe — 404 Not Found:**
```
Provincia no encontrada.
```


INSERTS: INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Buenos Aires', 'Provincia de Buenos Aires', -36.6769415, -60.5588319, 1);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('CABA', 'Ciudad Autónoma de Buenos Aires', -34.6144009, -58.4458809, 2);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Catamarca', 'Provincia de Catamarca', -28.4715867, -65.7877209, 3);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Chaco', 'Provincia del Chaco', -27.4257875, -59.0243784, 4);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Chubut', 'Provincia del Chubut', -43.2934688, -65.1114650, 5);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Córdoba', 'Provincia de Córdoba', -31.4166654, -64.1833319, 6);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Corrientes', 'Provincia de Corrientes', -27.4692131, -58.8306349, 7);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Entre Ríos', 'Provincia de Entre Ríos', -31.7746399, -60.4956679, 8);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Formosa', 'Provincia de Formosa', -26.1849718, -58.1730887, 9);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Jujuy', 'Provincia de Jujuy', -24.1857724, -65.2994703, 10);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('La Pampa', 'Provincia de La Pampa', -37.1315471, -65.4466239, 11);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('La Rioja', 'Provincia de La Rioja', -29.4130128, -66.8559932, 12);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Mendoza', 'Provincia de Mendoza', -34.9964963, -67.9986359, 13);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Misiones', 'Provincia de Misiones', -27.4266541, -55.9473344, 14);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Neuquén', 'Provincia del Neuquén', -38.9516952, -68.0591239, 15);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Río Negro', 'Provincia de Río Negro', -40.8261800, -63.0533400, 16);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Salta', 'Provincia de Salta', -24.7978799, -65.4150367, 17);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('San Juan', 'Provincia de San Juan', -30.8653380, -68.8894150, 18);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('San Luis', 'Provincia de San Luis', -33.2961690, -66.3291760, 19);
INSERT INTO public.provincias (nombre, nombrecompleto, latitud, longitud, displayorder) VALUES('Santa Cruz', 'Provincia de Santa Cruz', -51.6352880, -69.2474640, 20);
