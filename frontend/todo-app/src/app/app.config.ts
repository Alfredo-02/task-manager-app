// Importa Routes y funciones necesarias para configurar el enrutamiento y el cliente HTTP en Angular
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

// Configuración de proveedores para el enrutamiento y el cliente HTTP
export const appConfig = {
  providers: [
    // Proveedor de rutas de la aplicación
    provideRouter([
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },  // Redirige por defecto a '/tasks'
      { path: 'tasks', component: TaskListComponent },  // Ruta para listar las tareas
      { path: 'tasks/new', component: TaskFormComponent },  // Ruta para crear una nueva tarea
      { path: 'tasks/edit/:id', component: TaskFormComponent },  // Ruta para editar una tarea con ID
    ]),
    // Proveedor del cliente HTTP para hacer peticiones HTTP
    provideHttpClient(),
  ],
};
