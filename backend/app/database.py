from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexión a la base de datos MySQL
SQLALCHEMY_DATABASE_URL = "mysql://root:Admin08.@localhost/todo_db"

# Se crea el motor de base de datos utilizando la URL de conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Se crea la clase SessionLocal, que maneja la sesión de base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Es utilizada para definir los modelos de la base de datos
Base = declarative_base()

# Función que obtiene una sesión de base de datos
def get_db():
    db = SessionLocal() # Inicia la sesión
    try:
        yield db   # Devuelve la sesión a quien la requiera
    finally:
        db.close()  # Asegura que la sesión se cierre después de su uso
 