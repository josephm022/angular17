import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormGroup } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { RolesService } from '../../services/roles.service';
import { TipoDocService } from '../../services/tipo-doc.service';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import { Rol } from '../../interfaces/rol.interface';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-eliminados',
  standalone: true,
  imports: [DomseguroPipe],
  templateUrl: './usuarios-eliminados.component.html',
  styleUrl: './usuarios-eliminados.component.css'
})
export class UsuariosEliminadosComponent implements OnInit{

  constructor(private usuarioServcie: UsuarioService, private rolesService:RolesService,private documentosService:TipoDocService){}
  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerDocumentos();
    }

  usuarios: any =[];
  usuariosInactivos: any =[];
  usuarioSeleccionado: any = {};
  usuario: any;
  formulario: any;
  Form: FormGroup;
  noImage ='https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg';


  roles: Map<string, string> = new Map();
  documentos: Map<string, string> = new Map();

  obtenerUsuarios() {
    this.usuarioServcie.obtenerUsuarios().subscribe((res:Usuario) => {
      this.usuarios = res;
      this.usuariosInactivos = this.usuarios.filter((rol: Usuario) => rol.activo == '0');

    });
  }

  verUsuario(id: string) {
    this.usuarioServcie.obtenerUnUsuario(id).subscribe((res) => {
      console.log(res)
      this.usuarioSeleccionado = res;
    });
  }

  obtenerDescripcionRol(id_rol: string): string {
    return this.roles.get(id_rol) || 'Rol no encontrado';
  }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res: Rol[]) => {
      res.forEach((rol) => {
        this.roles.set(rol.id, rol.descripcion);
      });
    });
  }

  obtenerDocumentos() {
    this.documentosService
      .obtenerDocumentos()
      .subscribe((res: tipoDocumento[]) => {
        res.forEach((documento) => {
          this.documentos.set(documento.id, documento.descripcion);
        });
      });
  }

  obtenerDescripcionDocumento(id_tipo_doc: string): string {
    return (
      this.documentos.get(id_tipo_doc) || 'Tipo de documento no encontrado'
    );
  }

  restaurar(id:string){

    this.usuarioServcie.obtenerUnUsuario(id).subscribe((res:Usuario) =>{
      this.usuario =res;
      localStorage.setItem('idUsuario', this.usuario.id);
    });
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de restaurar este elemento?',
      showCancelButton: true,
      confirmButtonText: 'Restaurar',

    }).then((result) => {
      if(result.isConfirmed){
        this.usuario.activo = '1';
        
        this.usuarioServcie.editarUsuario(localStorage.getItem('idUsuario'),this.usuario).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'El Usuario ha sido restaurado',
            confirmButtonText: 'OK',
          }).then((result) => {
            localStorage.removeItem('idUsuario');
            location.reload();
          })
        })
      }
    })
  }
/*
  restaurar(id:string){
    this.rolesService.obtenerUnRol(id).subscribe((res:Rol) =>{
      this.rol =res;
      this.Form.setValue({
        descripcion: this.rol[0]['descripcion']
      })
      localStorage.setItem('idRol', this.rol[0]['id']);
    });
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de restaurar este elemento?',
      showCancelButton: true,
      confirmButtonText: 'Restaurar',
    }).then((result) => {
      if(result.isConfirmed){
        this.formulario ={
          descripcion: this.Form.value.descripcion,
          activo:'1'
        };
        this.rolesService.editarRol(localStorage.getItem('idRol'),this.formulario).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'El tipo de documento ha sido restaurado',
            confirmButtonText: 'OK',
          }).then((result) => {
            localStorage.removeItem('idRol');
            this.router.navigate(['/home/roles'])
          })
        })
        
      }
    })
  }

*/
}
