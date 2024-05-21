import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rol } from '../interfaces/rol.interface';

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

  agregarRol(formData: any){
    return this.http.post<any>(`${this.URL}/index.php?action=roles`,formData);
  }
  
  editarRol(id:any, formData:Rol){
    return this.http.put(`${this.URL}/index.php?action=roles&id=${id}`,formData)
  }

}
