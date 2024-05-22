import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './interfaces/usuario.interface';
import { HttpClientModule } from '@angular/common/http';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { DocumentosEliminadosComponent } from './dashboard/documentos-eliminados/documentos-eliminados.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RegisterComponent,HttpClientModule,DomseguroPipe,DocumentosEliminadosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  usuarios:any =[];

  constructor(){}
  ngOnInit() {
 
  }
  title = 'trabajo-final';
  usuarioLogged = true;

}
