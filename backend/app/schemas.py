from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

# Clase base
class TaskBase(BaseModel):
    title: str   # Titulo de la tarea obligatorio 
    description: Optional[str] = None # Descripción de la tarea opcional
    status: Optional[str] = "pendiente"  # (pendiente, en_progreso, completada)


    # Valida estado 
    @validator('status')
    def validate_status(cls, v):
        if v not in ["pendiente", "en_progreso", "completada"]:
            raise ValueError('El status debe ser: pendiente, en_progreso o completada')
        return v

    # Valida que el titulo no este vacio, no puede tener mas de 100 caracteres
    @validator('title')
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError('El título no puede estar vacío')
        if len(v) > 100:
            raise ValueError('El título no puede tener más de 100 caracteres')
        return v.strip()
    
# Esquema para la creacion de una tarea
class TaskCreate(TaskBase):
    pass

# Esquema para la actualización de una tarea
class TaskUpdate(TaskBase):
    title: Optional[str] = None # Título opcional para actualizar
    status: Optional[str] = None # Estado opcional para actualizar

class Task(TaskBase):
    # Esquema que representa una tarea completa
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    # Configuracion adicional para Pydantic
    class Config:
        orm_mode = True