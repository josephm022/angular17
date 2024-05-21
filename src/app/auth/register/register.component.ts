import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import {tipoDocumento} from '../../interfaces/tipo-doc.interface';
import {TipoDocService} from '../../services/tipo-doc.service';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  roles: any =[];
  tipoDocs: any =[];

constructor(private usuarioService: UsuarioService, private router: Router, private fb:FormBuilder,private tipoDocService: TipoDocService, private rolesService: RolesService) { }
formUser: FormGroup;
ngOnInit(): void {
  this.obtenerDocumentos();
  this.obtenerRoles();
  this.formUser= this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellido': ['', Validators.required],
    'email': ['', [Validators.required]],
    'genero': ['', Validators.required],
    'imagen': ['', [Validators.required]],
    'fecha': ['', Validators.required],
    'rol': ['', [Validators.required]],
    'tipodocumento': ['', Validators.required],
    'numerotel': ['', [Validators.required]],
    'numdocumento': ['', Validators.required],
    'password': ['', [Validators.required]],
  })
}
obtenerDocumentos() {
  this.tipoDocService.obtenerDocumentos().subscribe((res:tipoDocumento) => {
    this.tipoDocs = res;
  });
}

obtenerRoles() {
  this.rolesService.obtenerRoles().subscribe((res:Rol) => {
    this.roles = res;
  });
}

registrarUsuarios(){
  let usuario:Usuario = {
    nombres: this.formUser.get('nombre')?.value,
    apellidos: this.formUser.get('apellido')?.value,
    email: this.formUser.get('email')?.value,
    num_telefono: this.formUser.get('numerotel')?.value,
    num_documento: this.formUser.get('numdocumento')?.value,
    contrasena: this.formUser.get('password')?.value,
    genero: this.formUser.get('genero')?.value,
    foto: this.formUser.get('imagen')?.value,
    fecha_nacimiento: this.formUser.get('fecha')?.value,
    id_rol: this.formUser.get('rol')?.value,
    id_tipo_doc: this.formUser.get('tipodocumento')?.value,
    activo:"1",
  };
  //console.log(usuario);

  this.usuarioService.agregarUsuario(usuario).subscribe(response => {
    console.log(response);
    this.router.navigate(['/login']);

  }, error => {
    console.error('Error al registrar', error);
  });
  }
}