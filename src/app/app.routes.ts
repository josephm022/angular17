import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { RolesComponent } from './dashboard/roles/roles.component';
import { TipoDocumentosComponent } from './dashboard/tipo-documentos/tipo-documentos.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Aplicar el guardia de autenticación a esta ruta principal
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'documentos', component: TipoDocumentosComponent },
    ],
  },
];
