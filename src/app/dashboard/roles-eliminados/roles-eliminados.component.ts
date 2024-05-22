import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RolesService } from '../../services/roles.service';
import { Rol } from '../../interfaces/rol.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-eliminados',
  standalone: true,
  imports: [],
  templateUrl: './roles-eliminados.component.html',
  styleUrl: './roles-eliminados.component.css'
})

  
export class RolesEliminadosComponent implements OnInit{

  constructor(private fb: FormBuilder, private rolesService:RolesService, private router:Router){}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: [''],
    })
    this.obtenerRoles();
  }

  roles: any =[];
  rolesInactivos: any =[];
  rol: any;
  formulario: any;
  Form: FormGroup;

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res:Rol) => {
      this.roles = res;
      this.rolesInactivos = this.roles.filter((rol: Rol) => rol.activo == '0');

    });
  }

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

}
