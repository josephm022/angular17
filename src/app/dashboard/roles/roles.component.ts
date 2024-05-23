import { Component, OnInit } from '@angular/core';
import { Rol } from '../../interfaces/rol.interface';
import { RolesService } from '../../services/roles.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit{
  roles: any =[];
  rol: any;
  formulario: any;
  Form: FormGroup;
  rolesActivos: any =[];


  constructor(private rolesService: RolesService,private fb: FormBuilder, private router:Router) {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: ['', [Validators.required]],
    })

    this.obtenerRoles();
    }
    
    agregarRol(){
      this.formulario = {
        descripcion: this.Form.value.descripcion,
        activo: '1',
      };
    
      // Obtener todos los documentos existentes
      this.rolesService.obtenerRoles().subscribe(
        (existentes: any[]) => { 
          const documentoExistente = existentes.find(doc => doc.descripcion === this.formulario.descripcion);
          if (documentoExistente) {
            if (documentoExistente.activo == '0') {
            
              // Si el documento existe pero está inactivo, preguntar si se desea activar
              Swal.fire({
                title: 'Documento inactivo encontrado',
                text: "Ya existe un Rol con esta descripción, pero está inactivo. ¿Deseas activarlo?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, activarlo',
                cancelButtonText: 'No, cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  this.rolesService.editarRol(documentoExistente.id, { ...documentoExistente, activo: '1' }).subscribe(
                    (res) => {
                      Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Rol activado correctamente',
                        showConfirmButton: true,
                      }).then(() => {
                        location.reload();
                      });
                    },
                    (err) => {
                      Swal.fire('Error', err, 'error');
                    }
                  );
                }
              });
            } else {
              // Si el documento existe y está activo, mostrar una advertencia
              Swal.fire({
                icon: 'warning',
                title: 'Documento ya existe',
                text: 'Ya existe un Rol con esta descripción y está activo.',
                showConfirmButton: true,
              });
            }
          } else {
            // Si no existe un documento con la misma descripción, agregar el nuevo documento
            this.rolesService.agregarRol(this.formulario).subscribe(
              (res) => {
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
        },
        (err) => {
          Swal.fire('Error', 'No se pudo obtener la lista de roles', 'error');
        }
      );
    }
    
    navegarEliminados(){
      this.router.navigate(['/home/roles-eliminados'])
    }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe((res:Rol) => {
      this.roles = res;
      this.rolesActivos = this.roles.filter((activo: Rol) => activo.activo == '1');
      console.log(this.roles);
    });
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



  borrarElemento(id:string){
    this.rolesService.obtenerUnRol(id).subscribe((res:Rol) =>{
      this.rol =res;
      this.Form.setValue({
        descripcion: this.rol[0]['descripcion']
      })
      localStorage.setItem('idRol', this.rol[0]['id']);
    });
    Swal.fire({
      icon: 'question',
      title: '¿Está seguro de eliminar este elemento?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.formulario ={
          descripcion: this.Form.value.descripcion,
          activo:'0'
        };
        this.rolesService.editarRol(localStorage.getItem('idRol'),this.formulario).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'El Rol ha sido eliminado',
            confirmButtonText: 'OK',
          }).then((result) => {
            localStorage.removeItem('idRol');
            location.reload();
          })
        })
        
      }
    })

  }
  



  cerrarForm() {
    this.Form.reset();
    localStorage.removeItem('idRol');
  }
}
