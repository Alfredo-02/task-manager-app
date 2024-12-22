import pytest
from unittest.mock import Mock, patch
from sqlalchemy.orm import Session
from app import schemas, models
from app.services import TaskService
from app.repositories import TaskRepository
from datetime import datetime

# Fixtures (Accesorios de prueba)
@pytest.fixture
def task_repository():
    return TaskRepository()

@pytest.fixture
def task_service(task_repository):
    return TaskService(task_repository)

@pytest.fixture
def mock_db():
    return Mock(spec=Session)

@pytest.fixture
def sample_task():
    return models.Task(
        id=1,
        title="Tarea de Prueba",
        description="Descripción de Prueba",
        status="pendiente",
        created_at=datetime.now()
    )

# Pruebas Unitarias para TaskService
class TestTaskService:
    def test_get_all_tasks(self, task_service, mock_db, sample_task):
        # Preparar
        mock_db.query().all.return_value = [sample_task]
        
        # Actuar
        result = task_service.get_all_tasks(mock_db)
        
        # Verificar
        assert len(result) == 1
        assert result[0].title == "Tarea de Prueba"

    def test_get_task_by_id(self, task_service, mock_db, sample_task):
        # Preparar
        mock_db.query().filter().first.return_value = sample_task
        
        # Actuar
        result = task_service.get_task_by_id(mock_db, 1)
        
        # Verificar
        assert result.id == 1
        assert result.title == "Tarea de Prueba"

    def test_create_task(self, task_service, mock_db, sample_task):
        # Preparar
        task_create = schemas.TaskCreate(
            title="Nueva Tarea",
            description="Nueva Descripción"
        )
        mock_db.add = Mock()
        mock_db.commit = Mock()
        mock_db.refresh = Mock()
        
        with patch.object(models.Task, '__init__', return_value=None):
            # Actuar
            result = task_service.create_task(mock_db, task_create)
            
            # Verificar
            mock_db.add.assert_called_once()
            mock_db.commit.assert_called_once()
            mock_db.refresh.assert_called_once()

    def test_update_task(self, task_service, mock_db, sample_task):
        # Preparar
        task_update = schemas.TaskUpdate(
            title="Tarea Actualizada",
            status="completada"
        )
        mock_db.query().filter().first.return_value = sample_task
        
        # Actuar
        result = task_service.update_task(mock_db, 1, task_update)
        
        # Verificar
        mock_db.commit.assert_called_once()
        mock_db.refresh.assert_called_once()

    def test_delete_task(self, task_service, mock_db, sample_task):
        # Preparar
        mock_db.query().filter().first.return_value = sample_task
        
        # Actuar
        result = task_service.delete_task(mock_db, 1)
        
        # Verificar
        assert result is True
        mock_db.delete.assert_called_once()
        mock_db.commit.assert_called_once()

    