export interface Task { // Interfaz para una tarea existente
  id: number; // Identificador único de la tarea
  title: string; // Titulo de la tarea
  description?: string; // Descripcion opcional de la tarea
  status: 'pendiente' | 'en_progreso' | 'completada'; // Estado de la tarea
}

export interface TaskCreate { // Interfaz para la creación de una nueva tarea
  title: string; // Título de la nueva tarea
  description?: string; // Descripcion opcional de la nueva tarea
  status: 'pendiente' | 'en_progreso' | 'completada'; // Estado de la nueva tarea
}

export interface TaskUpdate { // Interfaz para actualizar una tarea existente
  title: string; // Nuevo titulo de la tarea
  description?: string; // Nueva descripcion opcional de la tarea
  status: 'pendiente' | 'en_progreso' | 'completada'; // Nuevo estado de la tarea
}
