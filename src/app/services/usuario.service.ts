import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UpLoadImg } from '../interfaces/cargarimg.interface';
import { Observable, catchError, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = 'http://miapi.com';

  constructor(private http:HttpClient){}

  obtenerUsuarios(){
    return this.http.get<any>(`${this.URL}/index.php?action=usuario`);
  }
  obtenerUnUsuario(id:string){
    return this.http.get<any>(`${this.URL}/index.php?action=usuario&id=${id}`)
  }
  agregarUsuario(formData: any){
    return this.http.post<any>(`${this.URL}/index.php?action=usuario`,formData);//.pipe(catchError(this.handleError)    );
  }
  
  editarUsuario(id:any, formData:Usuario){
    return this.http.put(`${this.URL}/index.php?action=usuario&id=${id}`,formData)
  }

  upLoadFile(archivo:UpLoadImg){
    if(archivo.nombreArchivo == "" && archivo.base64textString == null){
      return;
    }
    return this.http.post(`${this.URL}/views/img/index.php`,JSON.stringify(archivo));
  }

  deleteFile(foto:string){
    this.http.get<any>(`${this.URL}/views/img/delete.php?foto=${JSON.parse(foto)}`).subscribe(
      imgDel=>{
        console.log(imgDel);
      }
    );
  }

  
}

