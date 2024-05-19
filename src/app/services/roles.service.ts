import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private URL = 'http://miapi.com';

  constructor(private http:HttpClient){}

  obtenerRoles(){
    return this.http.get<any>(`${this.URL}/index.php?action=roles`);
  }

  obtenerUnRol(id:string){
    return this.http.get<any>(`${this.URL}/index.php?action=roles&id=${id}`);
  }

}
