from sqlalchemy.orm import Session
from . import schemas
from .repositories import TaskRepository

class TaskService:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def get_all_tasks(self, db: Session):
        return self.repository.get_all(db)

    def get_task_by_id(self, db: Session, task_id: int):
        return self.repository.get_by_id(db, task_id)

    def create_task(self, db: Session, task: schemas.TaskCreate):
        return self.repository.create(db, task)

    def update_task(self, db: Session, task_id: int, task: schemas.TaskUpdate):
        return self.repository.update(db, task_id, task)

    def delete_task(self, db: Session, task_id: int):
        return self.repository.delete(db, task_id)