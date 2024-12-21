from sqlalchemy.orm import Session
from . import schemas
from .repositories import TaskRepository

# Servicio que maneja la lógica de negocio para las tareas.
# Interactua con el repositorio de tareas para realizar operaciones CRUD.
class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    # Obtiene todas las tareas
    def get_all_tasks(self, db: Session):
        return self.repository.get_all(db)
    
    # Obtiene una tarea por su ID
    def get_task_by_id(self, db: Session, task_id: int):
        return self.repository.get_by_id(db, task_id)
    
    # Crea una nueva tarea
    def create_task(self, db: Session, task: schemas.TaskCreate):
        return self.repository.create(db, task)
    
    # Actualiza una tarea existente
    def update_task(self, db: Session, task_id: int, task: schemas.TaskUpdate):
        return self.repository.update(db, task_id, task)
    
    # Elimina una tarea
    def delete_task(self, db: Session, task_id: int):
        return self.repository.delete(db, task_id)