// Importa Component y RouterModule desde Angular
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importa RouterModule

@Component({
  selector: 'app-root',  // Selector del componente
  standalone: true, 
  imports: [RouterModule],  // Importa RouterModule para el enrutamiento
  templateUrl: './app.component.html',  // Plantilla HTML
  styleUrls: ['./app.component.scss']  // Estilos CSS/SCSS
})
export class AppComponent {
  title = 'Gestión de Tareas (To-Do List)';  // Título de la app
}
