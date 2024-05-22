import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { TipoDocService } from '../../services/tipo-doc.service';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UpLoadImg } from '../../interfaces/cargarimg.interface';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { numericValidator } from '../../validators/numericvalidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  roles: any = [];
  tipoDocs: any = [];
  maxSuperAdmins = 2;
  errorMessage: string | null = null;
  uuid = uuidv4();
  archivo: UpLoadImg;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private tipoDocService: TipoDocService,
    private rolesService: RolesService
  ) {
    this.archivo = {
      nombreArchivo: '',
      base64textString: null,
    };
  }
  formUser: FormGroup;
  ngOnInit(): void {
    this.obtenerDocumentos();
    this.obtenerRoles();
    this.formUser = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]],
      genero: ['', Validators.required],
      foto: null,
      fecha: ['', Validators.required],
      rol: ['', [Validators.required],[this.maxSuperAdminsValidator(this.usuarioService, this.maxSuperAdmins)]],
      tipodocumento: ['', Validators.required],
      numerotel: ['', [Validators.required,numericValidator()]],
      numdocumento: ['', Validators.required],
      password: ['', [Validators.required,Validators.maxLength(200),Validators.minLength(3)]],
    });

    this.formUser.get('rol')?.statusChanges.subscribe(status => {
      if (status === 'INVALID' && this.formUser.get('rol')?.errors?.['maxSuperAdmins']) {
        this.errorMessage = 'No se pueden crear más de dos usuarios con el rol de Super Administrador';
      } else {
        this.errorMessage = null;
      }
    });
  }

  /**VALIDACION DEL MAXIMO DE USUARIOS SUPER ADMIN */
  maxSuperAdminsValidator(usuarioService: UsuarioService, maxSuperAdmins: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (control.value === '1') {
        return usuarioService.contarUsuariosConRol('1').pipe(
          map(count => {
            if (count >= maxSuperAdmins) {
              return { maxSuperAdmins: true };
            }
            return null;
          })
        );
      }
      return of(null);
    };
  }
  obtenerDocumentos() {
    this.tipoDocService.obtenerDocumentos().subscribe((res: tipoDocumento) => {
      this.tipoDocs = res;
    });
  }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res: Rol) => {
      this.roles = res;
    });
  }
/************AGREGAR USUARIO */
  registrarUsuarios() {
    let usuario: Usuario = {
      nombres: this.formUser.get('nombre')?.value,
      apellidos: this.formUser.get('apellido')?.value,
      email: this.formUser.get('email')?.value,
      num_telefono: this.formUser.get('numerotel')?.value,
      num_documento: this.formUser.get('numdocumento')?.value,
      contrasena: this.formUser.get('password')?.value,
      genero: this.formUser.get('genero')?.value,
      foto: this.archivo.nombreArchivo,
      fecha_nacimiento: this.formUser.get('fecha')?.value,
      id_rol: this.formUser.get('rol')?.value,
      id_tipo_doc: this.formUser.get('tipodocumento')?.value,
      activo: '1',
    };

    this.usuarioService.agregarUsuario(usuario).subscribe(
      (response) => {
        this.upload();

        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: response.message || 'Usuario creado correctamente',
          showConfirmButton: true,
        }).then((result) => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        Swal.fire('Error al registar el usuario', error, 'error');
        console.error('Error al registrar', error);
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


}
