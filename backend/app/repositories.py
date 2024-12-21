from sqlalchemy.orm import Session
from . import models, schemas

class TaskRepository:
    # Repositorio metodos para interactuar con la base de datos y realizar operaciones CRUD sobre la tabla 'task'
    # Obtiene todas las tareas de la base de datos
    @staticmethod
    def get_all(db: Session):
        return db.query(models.Task).all()
    

    # Obtiene una tarea por su ID
    @staticmethod
    def get_by_id(db: Session, task_id: int):
        return db.query(models.Task).filter(models.Task.id == task_id).first()

    # Crea una nueva tarea en la base de datos
    @staticmethod
    def create(db: Session, task: schemas.TaskCreate):
        db_task = models.Task(**task.dict())
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    
    # ACtualiza una tarea existente en la base de datos
    @staticmethod
    def update(db: Session, task_id: int, task: schemas.TaskUpdate):
        db_task = TaskRepository.get_by_id(db, task_id)
        if db_task:
            update_data = task.dict(exclude_unset=True)
            for key, value in update_data.items():
                setattr(db_task, key, value)
            db.commit()
            db.refresh(db_task)
        return db_task
    
    # Elimina una tarea de la base de datos
    @staticmethod
    def delete(db: Session, task_id: int):
        db_task = TaskRepository.get_by_id(db, task_id)
        if db_task:
            db.delete(db_task)
            db.commit()
            return True
        return False
