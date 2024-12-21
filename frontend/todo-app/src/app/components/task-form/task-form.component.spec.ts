// Importación de módulos necesarios para testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskFormComponent ],
      imports: [
        ReactiveFormsModule,       // Para formularios reactivos
        RouterTestingModule,       // Para pruebas de routing
        HttpClientTestingModule    // Para pruebas de HTTP
      ],
      providers: [ TaskService ]   // Servicio necesario
    })
    .compileComponents();
  });

  // Crear instancia del componente antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba basica de creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Prueba de inicializacion del formulario
  it('should initialize with empty form', () => {
    expect(component.taskForm.get('title')?.value).toBe('');
    expect(component.taskForm.get('description')?.value).toBe('');
    expect(component.taskForm.get('status')?.value).toBe('pendiente');
  });

  // Prueba de validacion de campos requeridos
  it('should validate required fields', () => {
    const titleControl = component.taskForm.get('title');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.errors?.['required']).toBeTruthy();
  });
});