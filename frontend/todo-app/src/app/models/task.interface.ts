export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
}

export interface TaskCreate {
  title: string;
  description?: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
}

export interface TaskUpdate {
  title: string;
  description?: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
}