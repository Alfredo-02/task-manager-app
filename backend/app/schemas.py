from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[str] = "pendiente"

    @validator('status')
    def validate_status(cls, v):
        if v not in ["pendiente", "en_progreso", "completada"]:
            raise ValueError('El status debe ser: pendiente, en_progreso o completada')
        return v

    @validator('title')
    def validate_title(cls, v):
        if not v or not v.strip():
            raise ValueError('El título no puede estar vacío')
        if len(v) > 100:
            raise ValueError('El título no puede tener más de 100 caracteres')
        return v.strip()

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    status: Optional[str] = None

class Task(TaskBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True