import { ComponentFixture, TestBed } from '@angular/core/testing'; // Herramientas para pruebas en Angular

import { TaskListComponent } from './task-list.component'; // Componente a probar

describe('TaskListComponent', () => {
  let component: TaskListComponent; // Componente a probar
  let fixture: ComponentFixture<TaskListComponent>; // Instancia de la prueba

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent] // Importa el componente en el módulo de pruebas
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent); // Crea el componente
    component = fixture.componentInstance; // Asocia el componente a la variable
    fixture.detectChanges(); // Detecta cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree
  });
});
