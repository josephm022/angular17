import { Component } from '@angular/core';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-documentos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tipo-documentos.component.html',
  styleUrl: './tipo-documentos.component.css'
})
export class TipoDocumentosComponent {
  tipoDocs: any =[];
  tipoDoc: any;
  formulario: any;
  Form: FormGroup;

  constructor(private tipoDocService: TipoDocService,private fb: FormBuilder) {}
  ngOnInit(): void {
    this.Form = this.fb.group({
      descripcion: ['', [Validators.required]],
    })
    this.obtenerDocumentos();
    }

  obtenerDocumentos() {
    this.tipoDocService.obtenerDocumentos().subscribe((res:tipoDocumento) => {
      this.tipoDocs = res;
    });
  }

  agregarDocumento(){
    this.formulario = {
      descripcion: this.Form.value.descripcion,
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

  editarDocumento(){
    this.formulario ={
      descripcion: this.Form.value.descripcion
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
