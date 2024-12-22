# Aplicación de Lista de Tareas

Una aplicación full-stack de gestión de tareas construida con **FastAPI** (Backend) y **Angular** (Frontend).

## **Estructura del Proyecto**
```
proyecto/
├── backend/         # Aplicación FastAPI
├── frontend/        # Aplicación Angular
└── README.md        # Este archivo
```

## **Requisitos Previos**

Antes de ejecutar esta aplicación, asegúrate de tener instalado lo siguiente:

- **Python** 3.9 o superior
- **Node.js** y **npm**
- **Servidor MySQL**
- **Angular CLI** (instalar con: `npm install -g @angular/cli`)

---

## **Configuración de la Base de Datos**

1. Inicia sesión en MySQL y ejecuta los siguientes comandos:

```sql
-- Crear la base de datos
CREATE DATABASE todo_db;

-- Verificar que la base de datos se creó correctamente
SHOW DATABASES;

-- Otorgar privilegios al usuario root
GRANT ALL PRIVILEGES ON todo_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Seleccionar la base de datos
USE todo_db;
```

2. Agrega campos para manejar las marcas de tiempo en la tabla `tasks` (si aún no están configurados):

```sql
-- Configurar los campos de timestamps
ALTER TABLE tasks ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE tasks ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP;

-- Verificar la estructura de la tabla
DESCRIBE tasks;
```

La tabla `tasks` debe tener la siguiente estructura:

| Campo       | Tipo        | Clave        | Descripción                  |
|-------------|-------------|--------------|------------------------------|
| `id`        | INT         | PRIMARY KEY  | Identificador único          |
| `title`     | VARCHAR     |              | Título de la tarea           |
| `description`| TEXT       |              | Descripción detallada        |
| `status`    | VARCHAR     |              | Estado (completo, pendiente) |
| `created_at`| DATETIME    |              | Fecha de creación            |
| `updated_at`| DATETIME    |              | Fecha de última actualización|

---

## **Configuración del Backend**

1. Navega al directorio del backend:

```bash
cd backend
```

2. Crea y activa un entorno virtual:

```bash
python -m venv venv
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
```

3. Configura la conexión a la base de datos en el archivo `database.py`:

```python
# URL de conexión a la base de datos MySQL
SQLALCHEMY_DATABASE_URL = "mysql://root:Admin08.@localhost/todo_db"
```

4. Inicia el servidor backend:

```bash
uvicorn app.main:app --reload
```

- La API estará disponible en: [http://localhost:8000](http://localhost:8000)  
- La documentación interactiva estará en: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## **Configuración del Frontend**

1. Navega al directorio del frontend:

```bash
cd frontend
```

2. Instala las dependencias de Angular:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
ng serve
```

- La aplicación estará disponible en: [http://localhost:4200](http://localhost:4200)

## Ejecución de Pruebas

### Instalación de `pytest`

Asegúrate de tener instalado `pytest`. Si no lo tienes, instálalo con:

```bash
pip install pytest
```

### Ejecución de las Pruebas

1. **Ejecutar todas las pruebas:**
   ```bash
   pytest test/
   ```

2. **Ejecutar pruebas unitarias:**
   ```bash
   pytest test/test_unit.py
   ```

3. **Ejecutar pruebas de integración:**
   ```bash
   pytest test/test_integration.py
   ```

### Opciones adicionales
- **Modo detallado:**
  ```bash
  pytest -v
  ```

- **Detener en el primer fallo:**
  ```bash
  pytest -x
  ```

- **Ver errores detallados:**
  ```bash
  pytest -vv
  ```

### Nota
Para las pruebas de integración, asegúrate de que el archivo de base de datos de prueba (`test.db`) se genere correctamente y sea accesible.

---
