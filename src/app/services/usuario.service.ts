import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'http://miapi.com';

  constructor(private http:HttpClient){}

  obtenerUsuarios(){
    return this.http.get<any>(`${this.URL}/index.php?action=usuario`);
  }

  
}

