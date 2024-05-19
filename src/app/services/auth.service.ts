import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://miapi.com/index.php?action=login';
  private UserURL = 'http://miapi.com';


  constructor(private http: HttpClient, private router: Router) { }
  
  login(email: string, password: string) {
    return this.http.post<any>(this.URL, { email, contrasena: password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getUserID() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  obtenerUnUsuario(id:string){
    return this.http.get<any>(`${this.UserURL}/index.php?action=usuario&id=${id}`);  
  }


}
