import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cabecero',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './cabecero.component.html',
  styleUrl: './cabecero.component.css'
})
export class CabeceroComponent {

  constructor(private authService:AuthService){}

  cerrarSesion(){
    this.authService.logout()
  }

}
