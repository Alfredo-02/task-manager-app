import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterModule],  // Agrega RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestión de Tareas (To-Do List)';
}
