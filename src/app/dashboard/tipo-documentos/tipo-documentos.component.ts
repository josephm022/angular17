import { Component } from '@angular/core';
import { TipoDocService } from '../../services/tipo-doc.service';
import { tipoDocumento } from '../../interfaces/tipo-doc.interface';

@Component({
  selector: 'app-tipo-documentos',
  standalone: true,
  imports: [],
  templateUrl: './tipo-documentos.component.html',
  styleUrl: './tipo-documentos.component.css'
})
export class TipoDocumentosComponent {
  tipoDocs: any =[];

  constructor(private tipoDocService: TipoDocService) {}
  ngOnInit(): void {
    this.obtenerDocumentos();
    }

  obtenerDocumentos() {
    this.tipoDocService.obtenerDocumentos().subscribe((res:tipoDocumento) => {
      this.tipoDocs = res;
    });
  }

}
