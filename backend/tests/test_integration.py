from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, get_db
from app.main import app
import pytest

# Crear base de datos de prueba
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Sobreescribir la dependencia
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as client:
        yield client
    Base.metadata.drop_all(bind=engine)

# Pruebas de Integración
class TestTaskAPI:
    def test_create_task(self, client):
        response = client.post(
            "/api/tasks",
            json={"title": "Tarea de Prueba", "description": "Descripción de Prueba"}
        )
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == "Tarea de Prueba"
        assert data["description"] == "Descripción de Prueba"
        assert data["status"] == "pendiente"

    def test_get_tasks(self, client):
        # Primero crear una tarea
        client.post(
            "/api/tasks",
            json={"title": "Tarea de Prueba", "description": "Descripción de Prueba"}
        )
        
        # Luego obtener todas las tareas
        response = client.get("/api/tasks")
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0
        assert data[0]["title"] == "Tarea de Prueba"

    def test_get_task(self, client):
        # Primero crear una tarea
        create_response = client.post(
            "/api/tasks",
            json={"title": "Tarea de Prueba", "description": "Descripción de Prueba"}
        )
        task_id = create_response.json()["id"]
        
        # Luego obtener la tarea específica
        response = client.get(f"/api/tasks/{task_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == task_id
        assert data["title"] == "Tarea de Prueba"

    def test_update_task(self, client):
        # Primero crear una tarea
        create_response = client.post(
            "/api/tasks",
            json={"title": "Tarea de Prueba", "description": "Descripción de Prueba"}
        )
        task_id = create_response.json()["id"]
        
        # Luego actualizar la tarea
        response = client.put(
            f"/api/tasks/{task_id}",
            json={"title": "Tarea Actualizada", "status": "completada"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Tarea Actualizada"
        assert data["status"] == "completada"

    def test_delete_task(self, client):
        # Primero crear una tarea
        create_response = client.post(
            "/api/tasks",
            json={"title": "Tarea de Prueba", "description": "Descripción de Prueba"}
        )
        task_id = create_response.json()["id"]
        
        # Luego eliminar la tarea
        response = client.delete(f"/api/tasks/{task_id}")
        assert response.status_code == 200
        
        # Verificar que la tarea fue eliminada
        get_response = client.get(f"/api/tasks/{task_id}")
        assert get_response.status_code == 404