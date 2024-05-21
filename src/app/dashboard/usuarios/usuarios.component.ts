import { Component, OnInit } from '@angular/core';
import { CabeceroComponent } from '../cabecero/cabecero.component';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { DomseguroPipe } from '../../pipes/domseguro.pipe';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpLoadImg } from '../../interfaces/cargarimg.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CabeceroComponent,
    RouterModule,
    DomseguroPipe,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: any = [];
  usuario: any;
  usuarioSeleccionado: any = {};

  roles: Map<string, string> = new Map();
  documentos: Map<string, string> = new Map();
  archivo: UpLoadImg;
  noImage ='https://static.vecteezy.com/system/resources/previews/010/260/479/non_2x/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg';
  formulario: any;
  Form: FormGroup;
  uuid = uuidv4();

  Roles: any = [];
  TipoDocs: any = [];

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private documentosService: TipoDocService
  ) {
    this.archivo = {
      nombreArchivo: '',
      base64textString: null,
    };
  }

  ngOnInit(): void {
    this.Form = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      num_telefono: ['', [Validators.required]],
      num_documento: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      foto: null,
      fecha_nacimiento: ['', [Validators.required]],
      activo: [''],
      id_rol: ['', [Validators.required]],
      id_tipo_doc: ['', [Validators.required]],
    });
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.conseguirRoles();
    this.obtenerDocumentos();
    this.conseguirDocumentos();
  }

  /*****OBTENER UN USUARIO PARA EDITARLO */
  obtenerUnUsuario(id: string) {
    this.usuarioService.obtenerUnUsuario(id).subscribe((res: Usuario) => {
      this.usuario = res;
      this.Form.setValue({
        nombres: this.usuario[0]['nombres'],
        apellidos: this.usuario[0]['apellidos'],
        email: this.usuario[0]['email'],
        num_telefono: this.usuario[0]['num_telefono'],
        num_documento: this.usuario[0]['num_documento'],
        contrasena: this.usuario[0]['contrasena'],
        genero: this.usuario[0]['genero'],
        fecha_nacimiento: this.usuario[0]['fecha_nacimiento'],
        activo: '1',
        id_rol: this.usuario[0]['id_rol'],
        id_tipo_doc: this.usuario[0]['id_tipo_doc'],
        foto: null,
      });
      localStorage.setItem('idUsuario', this.usuario[0]['id']);
      localStorage.setItem('imgUsuario', this.usuario[0]['foto']);
    });
  }
/******EDITAR EL USUARIO CON EL ID DEL LOCAL STORAGE */
  editarUsuario() {
    let imgUsuario = localStorage.getItem('imgUsuario');
    if (this.Form.value.foto == null) {
      this.formulario = {
        foto: imgUsuario?.toString(),
        nombres: this.Form.value.nombres,
        apellidos: this.Form.value.apellidos,
        email: this.Form.value.email,
        num_telefono: this.Form.value.num_telefono,
        num_documento: this.Form.value.num_documento,
        contrasena: this.Form.value.contrasena,
        genero: this.Form.value.genero,
        fecha_nacimiento: this.Form.value.fecha_nacimiento,
        activo: '1',
        id_rol: this.Form.value.id_rol,
        id_tipo_doc: this.Form.value.id_tipo_doc,
      };
    } else {
      this.formulario = {
        foto: this.archivo.nombreArchivo,
        nombres: this.Form.value.nombres,
        apellidos: this.Form.value.apellidos,
        email: this.Form.value.email,
        num_telefono: this.Form.value.num_telefono,
        num_documento: this.Form.value.num_documento,
        contrasena: this.Form.value.contrasena,
        genero: this.Form.value.genero,
        fecha_nacimiento: this.Form.value.fecha_nacimiento,
        activo: '1',
        id_rol: this.Form.value.id_rol,
        id_tipo_doc: this.Form.value.id_tipo_doc,
      };
    }
    this.usuarioService.editarUsuario(localStorage.getItem('idUsuario'), this.formulario)
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'EXITO',
          text: `${res}`,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result) {
            if (this.formulario.foto == localStorage.getItem('imgUsuario')) {
              location.reload();
            } else if (
              this.formulario.foto !== localStorage.getItem('imgUsuario')
            ) {
              this.upload();
              this.deleteImage(
                JSON.stringify(localStorage.getItem('imgUsuario'))
              );
            } else {
              this.upload();
              this.deleteImage(
                JSON.stringify(localStorage.getItem('imgUsuario'))
              );
            }

            localStorage.removeItem('idUsuario');
            localStorage.removeItem('imgUsuario');

            location.reload();
          }
        });
      });
  }

  
//AGREGAR USUARIO NUEVO/////
  agregarUsuario(): void {
    this.formulario = {
      foto: this.archivo.nombreArchivo,
      nombres: this.Form.value.nombres,
      apellidos: this.Form.value.apellidos,
      email: this.Form.value.email,
      num_telefono: this.Form.value.num_telefono,
      num_documento: this.Form.value.num_documento,
      contrasena: this.Form.value.contrasena,
      genero: this.Form.value.genero,
      fecha_nacimiento: this.Form.value.fecha_nacimiento,
      activo: '1',
      id_rol: this.Form.value.id_rol,
      id_tipo_doc: this.Form.value.id_tipo_doc,
    };
    this.usuarioService.agregarUsuario(this.formulario).subscribe(
      (res) => {
        this.upload();

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: res.message || 'Contacto creado correctamente',
          showConfirmButton: true,
        }).then((result) => {
          location.reload();
        });
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }

  //TRABAJA CON LAS IMAGENES//////////////////////////////
  seleccionarArchivo(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = `${this.uuid}-${file.name}`;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  upload() {
    this.usuarioService.upLoadFile(this.archivo)?.subscribe((datos: any) => {
      console.log(datos);
    });
  }

  deleteImage(imagen: string) {
    this.usuarioService.deleteFile(imagen);
  }
  ///////////////////////////MOSTAR INFORMACION DE USUARIOS////////////////////////////////////////
  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((res: Usuario) => {
      this.usuarios = res;
    });
  }
  verUsuario(id: string) {
    this.usuarioService.obtenerUnUsuario(id).subscribe((res) => {
      this.usuarioSeleccionado = res[0];
    });
  }
  
  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res: Rol[]) => {
      res.forEach((rol) => {
        this.roles.set(rol.id, rol.descripcion);
      });
    });
  }

  obtenerDescripcionRol(id_rol: string): string {
    return this.roles.get(id_rol) || 'Rol no encontrado';
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

  conseguirDocumentos() {
    this.documentosService
      .obtenerDocumentos()
      .subscribe((res: tipoDocumento) => {
        this.TipoDocs = res;
      });
  }

  conseguirRoles() {
    this.rolesService.obtenerRoles().subscribe((res: Rol) => {
      this.Roles = res;
    });
  }
  
  /*****   CIERRA EL FORMULARIO Y ELIMINA LOS DATOS*****/
  cerrarForm() {
    this.Form.reset();
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('imgUsuario');
  }
}
