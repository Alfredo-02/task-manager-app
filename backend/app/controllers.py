from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import schemas
from .database import get_db
from .services import TaskService
from .repositories import TaskRepository

# Se crea una instancia del enrutador para organizar las rutas de la API
router = APIRouter()

# Se crea una instancia del servicio de tareas, que utiliza un repositorio para acceder a la base de datos
task_service = TaskService(TaskRepository())

# Ruta GET para obtener todas las tareas
@router.get("/tasks", response_model=List[schemas.Task])
def get_tasks(db: Session = Depends(get_db)):
    return task_service.get_all_tasks(db)

# Ruta GET para obtener una tarea específica por ID
@router.get("/tasks/{task_id}", response_model=schemas.Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = task_service.get_task_by_id(db, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return task

# Ruta POST para crear una nueva tarea
@router.post("/tasks", response_model=schemas.Task, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return task_service.create_task(db, task)

# Ruta PUT para actualizar una tarea existente por ID
@router.put("/tasks/{task_id}", response_model=schemas.Task)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = task_service.update_task(db, task_id, task)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return updated_task

# Ruta DELETE para eliminar una tarea por ID
@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    if not task_service.delete_task(db, task_id):
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    return {"mensaje": "Tarea eliminada exitosamente"}
