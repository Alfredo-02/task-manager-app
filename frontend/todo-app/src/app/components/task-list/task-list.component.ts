import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error('Error cargando tareas:', error)
    });
  }

  createTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  deleteTask(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: (error) => console.error('Error eliminando tarea:', error)
      });
    }
  }
}