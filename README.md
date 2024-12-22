Aplicación de Lista de Tareas
Una aplicación full-stack de gestión de tareas construida con FastAPI (Backend) y Angular (Frontend).
Estructura del Proyecto
Copyproyecto/
├── backend/         # Aplicación FastAPI
├── frontend/        # Aplicación Angular
└── README.md       # Este archivo
Requisitos Previos
Antes de ejecutar esta aplicación, asegúrate de tener instalado lo siguiente:

Python 3.9 o superior
Node.js y npm
Servidor MySQL
Angular CLI (npm install -g @angular/cli)

Configuración de la Base de Datos

Inicia sesión en MySQL y ejecuta los siguientes comandos:

-- Crear la base de datos
CREATE DATABASE todo_db;

-- Verificar que la base de datos se creó correctamente
SHOW DATABASES;

-- Otorgar privilegios al usuario root
GRANT ALL PRIVILEGES ON todo_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Seleccionar la base de datos
USE todo_db;

-- Configurar los campos de timestamps
ALTER TABLE tasks ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE tasks ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Verificar la estructura de la tabla
DESCRIBE tasks;
La tabla tasks debe tener la siguiente estructura:

id (PRIMARY KEY)
title (VARCHAR)
description (TEXT)
status (VARCHAR)
created_at (DATETIME)
updated_at (DATETIME)

Configuración del Backend

Navega al directorio del backend:

cd backend

Crea y activa un entorno virtual:

python -m venv venv
venv\Scripts\activate

Instala las dependencias:


Configura la base de datos:


Asegúrate de que la base de datos MySQL todo_db esté creada
Actualiza la cadena de conexión en database.py con:

# URL de conexión a la base de datos MySQL
SQLALCHEMY_DATABASE_URL = "mysql://root:Admin08.@localhost/todo_db"


Inicia el servidor backend:

uvicorn main:app --reload

La API estará disponible en http://localhost:8000
La documentación de la API (Swagger UI) estará disponible en http://localhost:8000/docs

Configuración del Frontend
Navega al directorio del frontend:
cd frontend

Instala las dependencias de Angular:
npm install
Inicia el servidor frontend:
ng serve
