// Importa Routes desde Angular y los componentes necesarios para las rutas
import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

// Define las rutas de la aplicación
export const routes: Routes = [
  // Ruta por defecto que redirige a '/tasks'
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // Ruta para mostrar la lista de tareas
  { path: 'tasks', component: TaskListComponent },
  // Ruta para crear una nueva tarea
  { path: 'tasks/new', component: TaskFormComponent },
  // Ruta para editar una tarea existente, pasando el ID en la URL
  { path: 'tasks/edit/:id', component: TaskFormComponent }
];
