import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskCreate, TaskUpdate } from '../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditing = false;
  taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      status: ['pendiente', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.taskId) {
      this.isEditing = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task);
      },
      error: (error) => console.error('Error cargando tarea:', error)
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      
      if (this.isEditing && this.taskId) {
        const updateTask: TaskUpdate = {
          title: formValue.title,
          description: formValue.description || undefined,
          status: formValue.status
        };
        
        this.taskService.updateTask(this.taskId, updateTask).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (error) => console.error('Error actualizando tarea:', error)
        });
      } else {
        const newTask: TaskCreate = {
          title: formValue.title,
          description: formValue.description || undefined,
          status: formValue.status
        };
        
        this.taskService.createTask(newTask).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (error) => console.error('Error creando tarea:', error)
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}