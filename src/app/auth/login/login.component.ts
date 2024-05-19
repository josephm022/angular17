import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { publicDecrypt } from 'crypto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  formUser: FormGroup;
  message:string;
  validarUsuario = false;
  
  constructor(private authService: AuthService, private router: Router, private fb:FormBuilder) { }
  ngOnInit(): void {
    this.formUser= this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', Validators.required]
    })
  }


  get email(){
    return this.formUser.get('email');
  }

  get password(){
    return this.formUser.get('password');
  }


  login() {

    const email = this.formUser.get('email')?.value;
    const password = this.formUser.get('password')?.value;

    this.authService.login(email, password).subscribe(response => {
      if (response.auth) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      } else {
        console.error('Login failed', response.error);
      }
    }, error => {
      console.error('Error during login', error);
      this.message  = 'El usuario y/o la contraseña son incorrectas';
      this.validarUsuario = true;
    });
  }

}
