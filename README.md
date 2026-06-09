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