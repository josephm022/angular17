import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tipoDocumento } from '../interfaces/tipo-doc.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  private URL = 'http://miapi.com';

  constructor(private http:HttpClient){}

  obtenerDocumentos(){
    return this.http.get<any>(`${this.URL}/index.php?action=tipo_documentos`);
  }

  obtenerUnDocumento(id:string){
    return this.http.get<any>(`${this.URL}/index.php?action=tipo_documentos&id=${id}`);
  }

  agregarDocumento(formData: any){
    return this.http.post<any>(`${this.URL}/index.php?action=tipo_documentos`,formData);
  }
  
  editarDocumento(id:any, formData:tipoDocumento){
    return this.http.put(`${this.URL}/index.php?action=tipo_documentos&id=${id}`,formData)
  }
}
