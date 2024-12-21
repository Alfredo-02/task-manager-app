import { Injectable } from '@angular/core'; // Decorador para definir el servicio como inyectable
import { HttpClient } from '@angular/common/http'; // Para realizar peticiones HTTP
import { Observable } from 'rxjs'; // Para manejar flujos de datos asíncronos
import { Task, TaskCreate, TaskUpdate } from '../models/task.interface'; // Importa las interfaces de tarea

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible a nivel global en la aplicación
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks'; // URL base para la API de tareas

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el servicio

  getTasks(): Observable<Task[]> { // Metodo para obtener todas las tareas
    return this.http.get<Task[]>(this.apiUrl); // Realiza una solicitud GET
  }

  getTaskById(id: number): Observable<Task> { // Metodo para obtener una tarea por su ID
    return this.http.get<Task>(`${this.apiUrl}/${id}`); // Realiza una solicitud GET con el ID
  }

  createTask(task: TaskCreate): Observable<Task> { // Metodo para crear una nueva tarea
    return this.http.post<Task>(this.apiUrl, task); // Realiza una solicitud POST
  }

  updateTask(id: number, task: TaskUpdate): Observable<Task> { // Metodo para actualizar una tarea
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task); // Realiza una solicitud PUT con el ID
  }

  deleteTask(id: number): Observable<void> { // Metodo para eliminar una tarea por su ID
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Realiza una solicitud DELETE con el ID
  }
}
