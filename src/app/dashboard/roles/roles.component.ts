import { Component, OnInit } from '@angular/core';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit{
  roles: any =[];
  rol: any;
  formulario: any;
  Form: FormGroup;

  constructor(private rolesService: RolesService,private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: ['', [Validators.required]],
    })

    this.obtenerRoles();
    }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res:Rol) => {
      this.roles = res;
    });
  }

  agregarRol(){
    this.formulario = {
      descripcion: this.Form.value.descripcion,
    };

    this.rolesService.agregarRol(this.formulario).subscribe(
      (res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: res.message || 'Rol creado correctamente',
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

  obtenerUnRol(id:string){
    this.rolesService.obtenerUnRol(id).subscribe((res:Rol) =>{
      this.rol =res;
      this.Form.setValue({
        descripcion: this.rol[0]['descripcion']
      })
      localStorage.setItem('idRol', this.rol[0]['id']);

    });
  }

  editarRol(){
    this.formulario ={
      descripcion: this.Form.value.descripcion
    };

    this.rolesService.editarRol(localStorage.getItem('idRol'),this.formulario).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: `${res}`,
        confirmButtonText: 'OK',
      }).then((result) => {
        localStorage.removeItem('idRol');
        location.reload();

      })
    })
  }

  cerrarForm() {
    this.Form.reset();
    localStorage.removeItem('idRol');
  }
}
