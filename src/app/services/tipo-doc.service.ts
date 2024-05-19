import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
