import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-list', // Selector para usar el componente
  standalone: true,
  imports: [CommonModule], // Importa CommonModule
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []; // Array de tareas

  constructor(
    private taskService: TaskService, // Servicio para manejar tareas
    private router: Router // Router para navegar entre vistas
  ) {}

  ngOnInit(): void {
    this.loadTasks(); // Carga las tareas al iniciar el componente
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({ // Obtiene las tareas desde el servicio
      next: (tasks) => this.tasks = tasks, // Asigna las tareas al array
      error: (error) => console.error('Error cargando tareas:', error) // Maneja errores
    });
  }

  createTask(): void {
    this.router.navigate(['/tasks/new']); // Navega a la vista para crear tarea
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]); // Navega a la vista de edición
  }

  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) { // Confirma eliminación
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(), // Recarga tareas después de eliminar
        error: (error) => console.error('Error eliminando tarea:', error) // Maneja errores
      });
    }
  }
}
