import { Component, OnInit } from '@angular/core';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-eliminados',
  standalone: true,
  imports: [],
  templateUrl: './documentos-eliminados.component.html',
  styleUrl: './documentos-eliminados.component.css'
})
export class DocumentosEliminadosComponent implements OnInit{
  tipoDocs: any =[];
  tipoDocsInactivos: any =[];
  tipoDoc: any;
  formulario: any;
  Form: FormGroup;
  constructor(private tipoDocService: TipoDocService, private router:Router,private fb: FormBuilder){}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: [''],
    })
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    this.tipoDocService.obtenerDocumentos().subscribe((res:tipoDocumento) => {
      this.tipoDocs = res;
      this.tipoDocsInactivos = this.tipoDocs.filter((doc: tipoDocumento) => doc.activo == '0');

    });
  }

  restaurar(id:string){
    this.tipoDocService.obtenerUnDocumento(id).subscribe((res:tipoDocumento) =>{
      this.tipoDoc =res;
      this.Form.setValue({
        descripcion: this.tipoDoc[0]['descripcion']
      })
      localStorage.setItem('idDoc', this.tipoDoc[0]['id']);
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
        this.tipoDocService.editarDocumento(localStorage.getItem('idDoc'),this.formulario).subscribe((res)=>{
          Swal.fire({
            icon: 'success',
            title: 'EXITO',
            text: 'El tipo de documento ha sido restaurado',
            confirmButtonText: 'OK',
          }).then((result) => {
            localStorage.removeItem('idDoc');
            this.router.navigate(['/home/documentos'])
          })
        })
        
      }
    })
  }

 

}
