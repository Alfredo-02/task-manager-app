import { TestBed } from '@angular/core/testing'; // Herramientas para pruebas en Angular

import { TaskService } from './task.service'; // Servicio a probar

describe('TaskService', () => {
  let service: TaskService; // Instancia del servicio a probar

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el módulo de pruebas
    service = TestBed.inject(TaskService); // Inyecta el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado correctamente
  });
});
