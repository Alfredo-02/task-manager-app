from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from .database import Base

class Task(Base):
    __tablename__ = "tasks"  # Nombre de la tabla en la base de datos

    # Columna clave primaria
    id = Column(Integer, primary_key=True, index=True)

     # Columna para el título de la tarea
    title = Column(String(100), nullable=False) # No puede ser nulo

    # Columna descripcion de la tarea
    description = Column(String(255))

    # Columna estado de la tarea
    status = Column(String(20), default="pendiente")  # pendiente, en_progreso, completada

    # Columna para la fecha y hora
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Columna para la fecha y hora de la ultima actualizacion de la tarea
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())