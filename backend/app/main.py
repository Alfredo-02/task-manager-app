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
    Base.metadata.create_all(bind=engine)
    logger.info("Tablas creadas exitosamente")
except Exception as e:
    logger.error(f"Error al crear las tablas: {str(e)}")
    raise

app = FastAPI(
    title="API de Tareas",
    description="API RESTful para gestionar una lista de tareas",
    version="1.0.0"
)

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/")
async def root():
    return {"mensaje": "Bienvenido a la API de Tareas"}
