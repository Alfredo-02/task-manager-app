from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from app import models
from app.database import engine, Base
from app.controllers import router

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Crear las tablas en la base de datos
try:
    # Crea todas las tablas definidas en los modelos usando el motor de base de datos
    Base.metadata.create_all(bind=engine)
    logger.info("Tablas creadas exitosamente")
except Exception as e:
    logger.error(f"Error al crear las tablas: {str(e)}")
    raise

# Crear la instancia de la aplicación FastAPI
app = FastAPI( 
    title="API de Tareas", # Titulo de la API
    description="API RESTful para gestionar una lista de tareas", # Descripción de la API
    version="1.0.0"
)

# Configuración de CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], # Permite peticiones solo desde esta URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Incluir las rutas del router (controladores)
app.include_router(router, prefix="/api")

# Ruta raíz que devuelve un mensaje de bienvenida
@app.get("/")
async def root():
    return {"mensaje": "Bienvenido a la API de Tareas"}
