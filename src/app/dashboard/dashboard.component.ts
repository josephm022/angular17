import { Component } from '@angular/core';
import { CabeceroComponent } from './cabecero/cabecero.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, CabeceroComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
 
  constructor() {}
  
}
