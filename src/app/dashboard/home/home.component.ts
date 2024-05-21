import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { DatePipe } from '@angular/common';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { error } from 'console';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DomseguroPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  noImage =
    'https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg';
  fechaFormateada: string;

  rol: Rol ={
    id:'',
    descripcion: ''
  }
  tipoDoc: tipoDocumento ={
    id:'',
    descripcion: ''
  }

  usuario: Usuario = {
    nombres: '',
    apelllidos: '',
    email: '',
    num_telefono: '',
    num_documento: '',
    contrasena: '',
    genero: '',
    fecha_nacimiento: '',
    id_rol: '',
    id_tipo_doc: '',
  };

  constructor(private auth: AuthService, private rolesService:RolesService, private tipodocService: TipoDocService) {}
  ngOnInit(): void {
    const userId = this.auth.getUserID();
    if (userId) {
      this.auth.obtenerUnUsuario(userId).subscribe(
        (response) => {
          this.usuario = response[0]; // Asumiendo que la respuesta es un array
          this.rolesService.obtenerUnRol(this.usuario.id_rol).subscribe(
            (response) => {
              this.rol = response[0];
            },(error) => {
              console.error('Error fetching user data', error);
            })
          
          this.tipodocService.obtenerUnDocumento(this.usuario.id_tipo_doc).subscribe(
            (response) => {
                this.tipoDoc = response[0];
            },(error) => {
                console.error('Error fetching user data', error);
            })  
        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    }
  }
}
