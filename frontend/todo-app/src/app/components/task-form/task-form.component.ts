import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo común de Angular
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Formulario reactivo en Angular
import { ActivatedRoute, Router } from '@angular/router'; // Servicios para manejar rutas
import { TaskService } from '../../services/task.service'; // Servicio para interactuar con tareas
import { TaskCreate, TaskUpdate } from '../../models/task.interface'; // Interfaces para la creación y actualización de tareas


 // Componente para la creación y edición de tareas.
 // Utiliza formularios reactivos para manejar la entrada de datos y se conecta con el 
 // servicio TaskService para crear o actualizar tareas.
 
@Component({
  selector: 'app-task-form', 
  standalone: true,
  imports: [
    CommonModule, // Importa el módulo común de Angular para características básicas
    ReactiveFormsModule // Importa el módulo de formularios reactivos para el manejo de formularios
  ],
  templateUrl: './task-form.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./task-form.component.scss'] // Ruta del archivo de estilos SCSS
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup; // Define el formulario reactivo para la creación o edición de una tarea
  isEditing = false; // Indica si se está editando una tarea existente
  taskId?: number; // ID de la tarea a editar (si existe)

  
  // Constructor del componente que inicializa el formulario reactivo y los servicios necesarios.
   
  constructor(
    private fb: FormBuilder, // Servicio de FormBuilder para crear formularios reactivos
    private taskService: TaskService, // Servicio para interactuar con las tareas
    private router: Router, // Servicio de navegación para cambiar de rutas
    private route: ActivatedRoute // Servicio para acceder a los parámetros de la ruta
  ) {
    // Inicialización del formulario reactivo con validadores
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]], // Título obligatorio
      description: [''], // Descripción opcional
      status: ['pendiente', [Validators.required]] // Estado obligatorio, con valor predeterminado "pendiente"
    });
  }

   // Método que se ejecuta al inicializar el componente.
   // Si se proporciona un ID de tarea en la ruta, se cargará la tarea correspondiente para editarla.

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id')); // Obtiene el ID de la tarea de la ruta
    if (this.taskId) {
      this.isEditing = true; // Se marca como edición
      this.loadTask(this.taskId); // Carga la tarea para editarla
    }
  }

  /**
   * Método para cargar los datos de una tarea existente usando su ID.
   * @param id - ID de la tarea a cargar.
   */
  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue(task); // Rellena el formulario con los datos de la tarea
      },
      error: (error) => console.error('Error cargando tarea:', error) // Muestra un error en caso de fallo
    });
  }

  
   // Método para enviar el formulario.
   // Si el formulario es válido, crea o actualiza una tarea dependiendo del modo (edición o creación).
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value; // Obtiene los valores del formulario
      
      if (this.isEditing && this.taskId) {
        // Si se está editando, crea un objeto TaskUpdate con los nuevos valores
        const updateTask: TaskUpdate = {
          title: formValue.title,
          description: formValue.description || undefined,
          status: formValue.status
        };
        
        // Llama al servicio para actualizar la tarea
        this.taskService.updateTask(this.taskId, updateTask).subscribe({
          next: () => this.router.navigate(['/tasks']), // Redirige a la lista de tareas si se actualiza correctamente
          error: (error) => console.error('Error actualizando tarea:', error) // Muestra un error en caso de fallo
        });
      } else {
        // Si se está creando, crea un objeto TaskCreate
        const newTask: TaskCreate = {
          title: formValue.title,
          description: formValue.description || undefined,
          status: formValue.status
        };
        
        // Llama al servicio para crear la nueva tarea
        this.taskService.createTask(newTask).subscribe({
          next: () => this.router.navigate(['/tasks']), // Redirige a la lista de tareas si se crea correctamente
          error: (error) => console.error('Error creando tarea:', error) // Muestra un error en caso de fallo
        });
      }
    }
  }

  
  // Método para cancelar la creación o edición y volver a la lista de tareas.
  cancel(): void {
    this.router.navigate(['/tasks']); 
  }
}
