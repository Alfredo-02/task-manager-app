import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

// Configuración de las rutas de la aplicación
export const appConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/new', component: TaskFormComponent },
      { path: 'tasks/edit/:id', component: TaskFormComponent },
    ]),
    provideHttpClient(),
  ],
};
