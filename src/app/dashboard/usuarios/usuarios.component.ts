import { Component, OnInit } from '@angular/core';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CabeceroComponent,RouterModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  usuarios:any =[];
  noImage = 'https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg'

  constructor(private usuarioService:UsuarioService){}
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe((res:Usuario)=>{
      this.usuarios = res;
    })
  }

}
