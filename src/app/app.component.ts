import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './interfaces/usuario.interface';
import { HttpClientModule } from '@angular/common/http';
import { DomseguroPipe } from './pipes/domseguro.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RegisterComponent,HttpClientModule,DomseguroPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  usuarios:any =[];

  constructor(private usuarioService:UsuarioService){}
  ngOnInit() {
    //this.obtenerContactos();
  }
  title = 'trabajo-final';
  usuarioLogged = true;

  /*obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe((res:Usuario)=>{
      this.usuarios = res;
      console.log(this.usuarios); 
    })
  }*/
}
