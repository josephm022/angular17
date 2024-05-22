import { Component } from '@angular/core';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tipo-documentos',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './tipo-documentos.component.html',
  styleUrl: './tipo-documentos.component.css'
})
export class TipoDocumentosComponent {
  tipoDocs: any =[];
  tipoDocsActivos: any =[];
  tipoDoc: any;
  formulario: any;
  Form: FormGroup;

  constructor(private tipoDocService: TipoDocService,private fb: FormBuilder,private router:Router) {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: ['', [Validators.required]],
    })
    this.obtenerDocumentos();
    }
    
    navegarEliminados(){
      this.router.navigate(['/home/documentos-eliminados'])
    }

  obtenerDocumentos() {
    this.tipoDocService.obtenerDocumentos().subscribe((res:tipoDocumento) => {
      this.tipoDocs = res;
      this.tipoDocsActivos = this.tipoDocs.filter((doc: tipoDocumento) => doc.activo == '1');

    });
  }

  agregarDocumento(){
    this.formulario = {
      descripcion: this.Form.value.descripcion,
      activo: '1',
    };
    this.tipoDocService.agregarDocumento(this.formulario).subscribe(
      (res)=>{
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: res.message || 'Tipo de documento creado correctamente',
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

  obtenerUnDocumento(id:string){
    this.tipoDocService.obtenerUnDocumento(id).subscribe((res:tipoDocumento) =>{
      this.tipoDoc =res;
      this.Form.setValue({
        descripcion: this.tipoDoc[0]['descripcion']
      })
      localStorage.setItem('idDoc', this.tipoDoc[0]['id']);

    });

  }

  borrarElemento(id:string){
    this.tipoDocService.obtenerUnDocumento(id).subscribe((res:tipoDocumento) =>{
      this.tipoDoc =res;
      this.Form.setValue({
        descripcion: this.tipoDoc[0]['descripcion']
      })
      localStorage.setItem('idDoc', this.tipoDoc[0]['id']);
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
        this.tipoDocService.editarDocumento(localStorage.getItem('idDoc'),this.formulario).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'El tipo de documento ha sido eliminado',
            confirmButtonText: 'OK',
          }).then((result) => {
            localStorage.removeItem('idDoc');
            location.reload();
          })
        })
        
      }
    })

  }

  editarDocumento(){
    this.formulario ={
      descripcion: this.Form.value.descripcion,
      activo: '1'
    };
    this.tipoDocService.editarDocumento(localStorage.getItem('idDoc'),this.formulario).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'EXITO',
        text: `${res}`,
        confirmButtonText: 'OK',
      }).then((result) => {
        localStorage.removeItem('idDoc');
        location.reload();
      })
    })
  }
  cerrarForm() {
    this.Form.reset();
    localStorage.removeItem('idDoc');
  }



}
